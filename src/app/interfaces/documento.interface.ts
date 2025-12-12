export interface Documento {
    name: string;
    url: string; // ruta en assets o URL remota (ej. 'assets/sample-docs/acta.pdf')
    type: string; // 'PDF', 'Imagen', 'Excel', etc.
    mime?: string; // 'application/pdf', 'image/jpeg', etc.
    size?: number; // bytes (opcional)
}