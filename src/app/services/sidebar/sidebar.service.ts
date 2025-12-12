import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    menu = [];

    constructor() { }

    cargarMenuSidebar() {
        return this.menu = [
            {
                titulo: 'Usuarios',
                icono: 'groups',
                submenu: [
                    { titulo: 'Usuarios', url: '/usuarios' },
                    { titulo: 'Empresas', url: '/empresas' },
                    { titulo: 'Proveedores', url: '/proveedores' }
                ]
            },
            {
                titulo: 'Seguridad',
                icono: 'security',
                submenu: [
                    { titulo: 'Citas', url: '/seguridad/citas' }
                ]
            },
            {
                titulo: 'Agenda',
                icono: 'event',
                submenu: [
                    { titulo: 'Eventos', url: '/agenda/eventos' }
                ]
            }
        ];
    }
}