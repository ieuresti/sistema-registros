import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cita } from '../../../services/eventos/eventos.service';

@Component({
	selector: 'app-eventos-dialog',
	templateUrl: './eventos-dialog.component.html',
	styleUrls: ['./eventos-dialog.component.css']
})
export class EventosDialogComponent {
	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<EventosDialogComponent>,
		// Inyectar los datos de la cita si se proporcionan
		@Inject(MAT_DIALOG_DATA) public data: { cita: Cita }
	) {
		const fechasConCitas = data?.cita;
		this.form = this.fb.group({
			id: [fechasConCitas?.id || ''],
			title: [fechasConCitas?.title || '', Validators.required],
			date: [fechasConCitas?.date || '', Validators.required],
			start: [fechasConCitas?.start || ''],
			end: [fechasConCitas?.end || ''],
			notes: [fechasConCitas?.notes || '']
		});
	}

	/**
	 * Metodo para guardar los cambios realizados en la cita
	 */
	save() {
		if (this.form.valid) {
			// Cerrar el diálogo y devolver los datos del formulario
			this.dialogRef.close(this.form.value);
		}
	}

	/**
	 * Metodo para cancelar y cerrar el diálogo sin guardar cambios
	 */
	cancel() {
		this.dialogRef.close(null);
	}
}
