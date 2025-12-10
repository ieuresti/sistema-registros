import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventosService, Cita } from '../../services/eventos/eventos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['title', 'tipo', 'start', 'end', 'actions'];
    dataSource = new MatTableDataSource<Cita>([]);

    constructor(
        private eventosService: EventosService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Configurar filtro para buscar por título o tipo de visita
        this.dataSource.filterPredicate = (data: Cita, filter: string) => {
            const filtroMinusculas = filter.trim().toLowerCase();
            const titulo = (data.title || '').toLowerCase();
            const tipoVisita = (data.visitType || '').toLowerCase();
            return titulo.includes(filtroMinusculas) || tipoVisita.includes(filtroMinusculas);
        };
        // Cargar sólo las citas de hoy (formato ISO yyyy-mm-dd)
        const hoy = new Date().toISOString().slice(0, 10);
        this.eventosService.getCitasPorFecha(hoy).subscribe(list => {
            this.dataSource.data = list;
        });
    }

    /**
     * Metodo que se ejecuta despues de que las vistas del componente han sido inicializadas
     */
    ngAfterViewInit(): void {
        // Asignar el paginador y el ordenamiento a la fuente de datos de la tabla
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /**
     * Metodo para aplicar un filtro de búsqueda en la tabla de visitas recientes
     */
    aplicarFiltroBusqueda(event: Event) {
        // Obtener el valor del filtro desde el evento de entrada
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase(); // Aplicar el filtro en minúsculas y sin espacios
    }

    /**
     * Metodo que redirecciona a la vista de detalles de la cita seleccionada
     */
    verCita(cita: Cita) {
        this.router.navigate(['/seguridad/cita', cita.id]);
    }

    /**
     * Metodo para obtener la clase CSS del chip segun el tipo de visita
     */
    getChipClass(tipoVisita: string): string {
        switch (tipoVisita) {
            case 'Presentación':
                return 'chip-blue';
            case 'Trabajo':
                return 'chip-yellow';
            case 'Cotización':
                return 'chip-green';
            case 'Entrega de material':
                return 'chip-red';
            default:
                return 'chip-red';
        }
    }
}