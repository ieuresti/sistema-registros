import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Cita {
	id: string;
	title: string;
	date: string; // ISO yyyy-mm-dd
	start?: string;
	end?: string;
	notes?: string;
	visitType?: string;
}

@Injectable({ providedIn: 'root' })
export class EventosService {
	// Datos simulados de citas
	private citas: Cita[] = [
		{ id: '1', title: 'Visita ACME', date: new Date().toISOString().slice(0, 10), start: '10:00', end: '11:00', visitType: 'Reunión' },
		{ id: '2', title: 'Entrega Documentos', date: new Date(new Date().getTime() + 24 * 3600 * 1000).toISOString().slice(0, 10), start: '14:00', visitType: 'Entrega de material' },
		{ id: '3', title: 'Reunión equipo', date: new Date().toISOString().slice(0, 10), start: '08:30', end: '09:15', visitType: 'Cotización' },
		{ id: '4', title: 'Llamada cliente', date: new Date().toISOString().slice(0, 10), start: '09:45', end: '10:15', visitType: 'Trabajo' },
		{ id: '5', title: 'Inspección sitio', date: new Date().toISOString().slice(0, 10), start: '16:00', end: '17:30', visitType: 'Reunión' },
		{ id: '6', title: 'Reunión gerencia', date: new Date(new Date().getTime() + 2 * 24 * 3600 * 1000).toISOString().slice(0, 10), start: '11:00', end: '12:00', visitType: 'Entrega de material' },
		{ id: '7', title: 'Revisión contrato', date: new Date(new Date().getTime() - 24 * 3600 * 1000).toISOString().slice(0, 10), start: '15:00', end: '16:00', visitType: 'Cotización' },
		{ id: '8', title: 'Demo producto', date: new Date(new Date().getTime() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10), start: '09:00', end: '10:30', visitType: 'Trabajo' },
		{ id: '9', title: 'Capacitación', date: new Date(new Date().getTime() + 24 * 3600 * 1000).toISOString().slice(0, 10), start: '09:00', end: '11:00', visitType: 'Reunión' },
		{ id: '10', title: 'Evento (todo el día)', date: new Date().toISOString().slice(0, 10), visitType: 'Trabajo' }
	];

	constructor() { }

	/**
	 * Endpoint que obtiene todas las citas
	 */
	getCitas(): Observable<Cita[]> {
		return of(this.citas);
	}

	/**
	 * Endpoint que obtiene las citas de una fecha específica
	 */
	getCitasPorFecha(fechaISO: string): Observable<Cita[]> {
		const listaCitas = this.citas.filter(cita => cita.date === fechaISO);
		return of(listaCitas);
	}

	/**
	 * Endpoint para actualizar una cita existente
	 */
	updateCita(citaActualizar: Cita): Observable<Cita> {
		const index = this.citas.findIndex(cita => cita.id === citaActualizar.id);
		// Si `index` es mayor o igual a 0 significa que la cita ya existe
		if (index > -1) {
			// Actualizamos la cita existente de forma inmutable combinando los campos actuales con los del objeto recibido (`citaActualizar`).
			// De este modo preservamos propiedades que no se hayan enviado en la actualización.
			this.citas[index] = { ...this.citas[index], ...citaActualizar };
			// Devolvemos un Observable que emite la cita actualizada.
			return of(this.citas[index]);
		}
		// Si no se encontró la cita (index === -1), la añadimos al array como nueva entrada.
		this.citas.push(citaActualizar);
		// Devolvemos un Observable que emite la cita recién creada.
		return of(citaActualizar);
	}

	/**
	 * Endpoint para eliminar una cita por ID
	 */
	deleteCita(id: string): Observable<boolean> {
		const index = this.citas.findIndex(cita => cita.id === id);
		// Si se encontró la cita, eliminarla del array
		if (index > -1) {
			this.citas.splice(index, 1);
			// Devolver un Observable que emite true indicando que se eliminó correctamente
			return of(true);
		}
		// Si no se encontró la cita, devolver false
		return of(false);
	}
}
