import { Documento } from './documento.interface';

export interface Cita {
    id: string;
    title: string;
    date: string; // ISO yyyy-mm-dd
    start?: string;
    end?: string;
    notes?: string;
    visitType?: 'Presentacion' | 'Cotizacion' | 'Trabajo' | 'Entrega de material';
    documents?: Documento[];
    status?: 'Pendiente' | 'Aceptada' | 'Rechazada';
}