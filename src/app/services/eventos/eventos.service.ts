import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cita } from 'src/app/interfaces/cita.interface';
import { Documento } from 'src/app/interfaces/documento.interface';

@Injectable({ providedIn: 'root' })
export class EventosService {
	// Datos simulados de citas
	private citas: Cita[] = [
		{
			id: '1',
			title: 'Juan Pérez',
			date: '2025-12-11',
			start: '09:00',
			end: '09:30',
			visitType: 'Trabajo',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Aceptada'
		},
		{
			id: '2',
			title: 'María López',
			date: '2025-12-11',
			start: '10:00',
			end: '10:30',
			visitType: 'Cotizacion',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Pendiente'
		},
		{
			id: '3',
			title: 'Carlos Gómez',
			date: '2025-12-12',
			start: '11:00',
			end: '11:45',
			visitType: 'Entrega de material',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Rechazada'
		},
		{
			id: '4',
			title: 'Ana Martínez',
			date: '2025-12-13',
			start: '08:30',
			end: '09:00',
			visitType: 'Cotizacion',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Rechazada'
		},
		{
			id: '5',
			title: 'Luis Fernández',
			date: '2025-12-11',
			start: '14:00',
			end: '14:30',
			visitType: 'Trabajo',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Aceptada'
		},
		{
			id: '6',
			title: 'Sofía Ruiz',
			date: '2025-12-14',
			start: '09:30',
			end: '10:00',
			visitType: 'Cotizacion',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Pendiente'
		},
		{
			id: '7',
			title: 'Diego Navarro',
			date: '2025-12-11',
			start: '15:00',
			end: '15:30',
			visitType: 'Entrega de material',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Pendiente'
		},
		{
			id: '8',
			title: 'Valentina Silva',
			date: '2025-12-15',
			start: '13:00',
			end: '13:30',
			visitType: 'Presentacion',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Aceptada'
		},
		{
			id: '9',
			title: 'Pedro Castillo',
			date: '2025-12-12',
			start: '16:00',
			end: '16:30',
			visitType: 'Presentacion',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Aceptada'
		},
		{
			id: '10',
			title: 'Lucía Moreno',
			date: '2025-12-16',
			start: '10:15',
			end: '10:45',
			visitType: 'Trabajo',
			documents: [
				{ name: 'http-response-codes.pdf', url: 'assets/sample-docs/http-response-codes.pdf', type: 'PDF', mime: 'application/pdf' },
				{ name: 'eevee-pokemon-wallpaper.jpg', url: 'assets/sample-docs/eevee-pokemon-wallpaper.jpg', type: 'Imagen', mime: 'image/jpeg' },
				{ name: 'SISTEMA CONTROL DE VISITAS.xlsx', url: 'assets/sample-docs/SISTEMA CONTROL DE VISITAS.xlsx', type: 'Excel', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
			],
			status: 'Rechazada'
		}
	];

	constructor(private http: HttpClient) { }

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

	/**
	 * Metodo para obtener los documentos asociados a una cita por su ID
	 */
	getDocumentsForCita(citaId: string): Documento[] {
		const cita = this.citas.find(x => x.id === citaId);
		// Retorna los documentos asociados a la cita o un array vacío si no hay documentos
		return cita?.documents || [];
	}

	/**
	 * Metodo para descargar un documento dado su URL
	 */
	downloadDocument(url: string) {
		// Retorna Observable<Blob> para que el componente decida qué hacer
		return this.http.get(url, { responseType: 'blob' });
	}
}
