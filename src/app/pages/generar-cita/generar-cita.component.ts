import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-generar-cita',
    templateUrl: './generar-cita.component.html',
    styleUrls: ['./generar-cita.component.css']
})
export class GenerarCitaComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    citaForm!: FormGroup;
    archivosSeleccionados: File[] = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        const timeValidators = [Validators.required, this.timeValidator.bind(this)];
        this.citaForm = this.fb.group({
            idVisita: ['', Validators.required],
            idProveedor: ['', Validators.required],
            idEmpleadoCliente: ['', Validators.required],
            idArea: ['', Validators.required],
            horaEntrada: ['', timeValidators],
            horaSalida: ['', timeValidators],
            documentos: [null, Validators.required]
        }, { validators: this.timeRangeValidator });
    }

    /**
     * Metodo para activar el input file oculto
     */
    triggerFileInput(): void {
        // Disparar el click en el input file oculto
        if (this.fileInput && this.fileInput.nativeElement) {
            this.fileInput.nativeElement.click();
        }
    }

    /**
     * Metodo que se ejecuta al cambiar el input file
     */
    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        // Verificar si hay archivos seleccionados
        if (!input.files) {
            return;
        }
        // Convertir FileList a Array de File
        this.archivosSeleccionados = Array.from(input.files);
        // Actualizar el valor del formulario con los archivos seleccionados
        this.citaForm.patchValue({ documentos: this.archivosSeleccionados });
        const docCtrl = this.citaForm.get('documentos');
        docCtrl?.updateValueAndValidity();
        docCtrl?.markAsTouched(); // Marcar como tocado para mostrar errores si los hay
    }

    /**
     * Metodo para remover un archivo seleccionado por indice
     */
    removerArchivo(index: number) {
        // Verificar si el indice es valido
        if (index < 0 || index >= this.archivosSeleccionados.length) {
            return;
        }
        // Remover el archivo del array
        this.archivosSeleccionados.splice(index, 1);
        // Actualizar el valor del formulario con los archivos restantes
        this.citaForm.patchValue({ documentos: this.archivosSeleccionados.length ? this.archivosSeleccionados : null });
        const docCtrl = this.citaForm.get('documentos');
        docCtrl?.updateValueAndValidity();
        // Si no quedan archivos, limpiar el input file oculto
        if (this.archivosSeleccionados.length === 0 && this.fileInput) {
            this.fileInput.nativeElement.value = '';
        }
    }

    /**
     * Metodo para limpiar todos los archivos seleccionados
     */
    limpiarArchivos() {
        this.archivosSeleccionados = [];
        // Actualizar el valor del formulario a null
        this.citaForm.patchValue({ documentos: null });
        const docCtrl = this.citaForm.get('documentos');
        docCtrl?.updateValueAndValidity();
        // Limpiar el input file oculto
        if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
        }
    }

    /**
     * Metodo validador para comprobar que la hora de salida es mayor que la hora de entrada
     */
    timeRangeValidator(control: AbstractControl): ValidationErrors | null {
        const horaEntradaCtrl = control.get('horaEntrada')?.value;
        const horaSalidaCtrl = control.get('horaSalida')?.value;
        // Validar solo si ambos controles tienen valor
        if (!horaEntradaCtrl || !horaSalidaCtrl) {
            return null;
        }
        // Helper para convertir HH:MM a minutos
        const toMinutes = (t: string) => {
            const parts = t.split(':').map(p => parseInt(p, 10));
            return (parts[0] || 0) * 60 + (parts[1] || 0);
        };
        const entrada = toMinutes(horaEntradaCtrl);
        const salida = toMinutes(horaSalidaCtrl);
        // Si la hora de salida es mayor que la de entrada, es válido, caso contrario, error
        return salida > entrada ? null : { timeRange: true };
    }

    /**
     * Validador para comprobar que el control contiene una hora válida HH:MM (00:00 - 23:59)
     */
    timeValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        // Permitir valores vacíos (otros validadores pueden manejar la obligatoriedad)
        if (value == null || value === '') {
            return null;
        }
        // Expresión regular para validar formato HH:MM (00:00 - 23:59)
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        // Retornar null si es válido, o error si no lo es
        return timeRegex.test(value) ? null : { invalidTime: true };
    }

    /**
     * Metodo que se ejecuta al enviar el formulario de cita
     */
    onCrearCita() {
        if (this.citaForm.invalid) {
            this.citaForm.markAllAsTouched();
            return;
        }

        // Crear el payload para enviar al backend
        const payload = { ...this.citaForm.value };
        console.log('Test payload enviado al backend: ', payload);
    }
}