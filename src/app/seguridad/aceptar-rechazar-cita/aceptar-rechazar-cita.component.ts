import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from '../../services/eventos/eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from 'src/app/interfaces/cita.interface';
import { Documento } from 'src/app/interfaces/documento.interface';

@Component({
    selector: 'app-aceptar-rechazar-cita',
    templateUrl: './aceptar-rechazar-cita.component.html',
    styleUrls: ['./aceptar-rechazar-cita.component.css']
})
export class AceptarRechazarCitaComponent implements OnInit {
    /** Emite el resultado cuando el guardado se procesa */
    @Output() decision = new EventEmitter<{ id: string, accepted: boolean, comment?: string }>();
    cita : Cita | null = null;
    form: FormGroup;
    citaId = '';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private eventosService: EventosService
    ) {
        this.form = this.fb.group({
            accepted: [true, Validators.required],
            comment: ['', Validators.required]
        });
        this.activatedRoute.params.subscribe(
            (params) => {
                this.citaId = params['id'];
            }
        );
    }

    ngOnInit(): void {
        // Simular la carga de la cita por ID
        this.eventosService.getCitas().subscribe(citas => {
            if (!this.cita) {
                this.cita = citas.find(c => c.id === this.citaId) || null;
            }
        });
    }

    /**
     * Metodo getter para obtener los documentos asociados a la cita actual.
     */
    get documentos() {
        return this.cita && this.cita.documents;
    }

    /**
     * Metodo para guardar la decision de aceptar o rechazar la cita
     */
    guardarDecision(): void {
        if (!this.cita) {
            return;
        }
        // Validar formulario antes de emitir
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const decisionAceptada = !!this.form.value.accepted; // true=aceptada, false=rechazada
        const comentarioDecision = this.form.value.comment || '';
        // Emitir la decisión usando la forma esperada por los listeners existentes
        this.decision.emit({ id: this.cita.id, accepted: decisionAceptada, comment: comentarioDecision });
        console.log('Decisión emitida', { id: this.cita.id, accepted: decisionAceptada, comment: comentarioDecision });
    }

    /**
     * Metodo que descarga un documento como Blob y fuerza la descarga en el navegador.
     */
    descargarDocumento(doc: Documento): void {
        this.eventosService.downloadDocument(doc.url).subscribe(contenidoBlob => {
            const urlDelBlob = URL.createObjectURL(contenidoBlob);
            const enlaceDescarga = document.createElement('a');
            enlaceDescarga.href = urlDelBlob;
            enlaceDescarga.download = doc.name;
            enlaceDescarga.click();
            URL.revokeObjectURL(urlDelBlob);
        }, () => alert('Error descargando'));
    }

    /**
     * Metodo para previsualizar un documento según su tipo MIME.
     */
    previsualizarDocumento(documento: Documento): void {
        if (!documento) {
            return;
        }
        // Determinar si el documento puede abrirse directamente en navegador
        const tipoMime = documento.mime || '';
        const esVisualizable = tipoMime.startsWith('image/') || tipoMime === 'application/pdf';

        if (esVisualizable) {
            window.open(documento.url, '_blank');
            return;
        }
        // Para otros tipos (por ejemplo Excel) forzamos la descarga mediante Blob
        this.descargarDocumento(documento);
    }
}