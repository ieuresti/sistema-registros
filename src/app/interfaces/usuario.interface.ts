export interface Usuario {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    lastVisitType?: 'Presentacion' | 'Cotizacion' | 'Trabajo' | 'Entrega de material';
}