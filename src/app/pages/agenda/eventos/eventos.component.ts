import { Component, OnInit } from '@angular/core';
import { EventosService, Cita } from '../../../services/eventos/eventos.service';
import { MatDialog } from '@angular/material/dialog';
import { EventosDialogComponent } from '../eventos-dialog/eventos-dialog.component';

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
    fechaSeleccionada: Date | null = new Date();
    // new Set<string>(); para almacenar fechas en formato ISO sin duplicados
    fechasConEventos = new Set<string>(); // Conjunto de fechas que tienen eventos
    citasDelDia: Cita[] = []; // Lista de citas para la fecha seleccionada

    constructor(
        private eventosService: EventosService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.eventosService.getCitas().subscribe(citas => {
            citas.forEach(cita => this.fechasConEventos.add(cita.date));
            // Si ya hay una fecha seleccionada, cargar sus citas
            if (this.fechaSeleccionada) {
                this.cargarCitasDelDia(this.fechaSeleccionada);
            }
        });
    }

    /**
     * Metodo para cargar las citas del día seleccionado
     */
    cargarCitasDelDia(fecha: Date) {
        const iso = this.convertirFechaAISO(fecha);
        this.eventosService.getCitasPorFecha(iso).subscribe(list => {
            this.citasDelDia = list;
        });
    }

    /**
     * Metodo para convertir una fecha a formato ISO (YYYY-MM-DD)
     */
    convertirFechaAISO(fecha: Date): string {
        return fecha.toISOString().slice(0, 10);
    }

    /**
     * Metodo para asignar una clase CSS a las fechas que tienen eventos
     */
    claseParaFechaConEvento = (fecha: Date) => {
        const iso = this.convertirFechaAISO(fecha);
        return this.fechasConEventos.has(iso) ? 'has-event' : '';
    }

    /**
     * Metodo que se ejecuta al seleccionar una fecha en el calendario
     */
    onFechaSeleccionada(fecha: Date) {
        this.fechaSeleccionada = fecha;
        this.cargarCitasDelDia(fecha);
    }

    /**
     * Metodo para abrir el dialog de la cita seleccionada
     */
    abrirDialogCita(cita: Cita) {
        const ref = this.dialog.open(EventosDialogComponent,
            {
                data: { cita },
                width: '520px' 
            }
        );
        ref.afterClosed().subscribe(result => {
            if (result) {
                // Si se recibió un resultado, actualizar la cita
                this.eventosService.updateCita(result).subscribe(() => {
                    if (this.fechaSeleccionada) {
                        // Recargar las citas del día actual
                        this.cargarCitasDelDia(this.fechaSeleccionada);
                    }
                    // Actualizar las fechas con eventos
                    this.eventosService.getCitas().subscribe(citas => {
                        this.fechasConEventos.clear();
                        citas.forEach(cita => this.fechasConEventos.add(cita.date));
                    });
                });
            }
        });
    }

    /**
     * Metodo para eliminar una cita por su ID
     */
    eliminarCita(id: string) {
        if (!confirm('¿Eliminar esta cita?')) {
            return;
        }
        this.eventosService.deleteCita(id).subscribe(ok => {
            // Recargar las citas del día actual
            if (ok && this.fechaSeleccionada) {
                this.cargarCitasDelDia(this.fechaSeleccionada);
            }
            // Actualizar las fechas con eventos
            this.eventosService.getCitas().subscribe(citas => {
                this.fechasConEventos.clear();
                citas.forEach(cita => this.fechasConEventos.add(cita.date));
            });
        });
    }
}