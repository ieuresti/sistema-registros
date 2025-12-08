import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

export interface Proveedor {
    id: string;
    nombre: string;
    direccion: string;
    correo: string;
    telefono: string;
}

@Component({
    selector: 'app-proveedores',
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['nombre', 'direccion', 'correo', 'telefono', 'acciones'];

    tableData: Proveedor[] = [
        { id: '1', nombre: 'Proveedor Uno', direccion: 'Calle A 1', correo: 'pv1@proveedor.com', telefono: '+34 600 100 001' },
        { id: '2', nombre: 'Proveedor Dos', direccion: 'Av. B 23', correo: 'pv2@proveedor.com', telefono: '+34 600 100 002' },
        { id: '3', nombre: 'Proveedor Tres', direccion: 'C/ Central 5', correo: 'pv3@proveedor.com', telefono: '+34 600 100 003' }
    ];

    dataSource = new MatTableDataSource<Proveedor>(this.tableData);

    constructor(private router: Router) { }

    ngOnInit(): void { }

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
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /**
     * Metodo para limpiar el campo de búsqueda
     */
    limpiarBuscador(input: HTMLInputElement) {
        if (!input) { 
            return;
        }
        input.value = '';
        this.dataSource.filter = '';
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /**
     * Metodo para redirigir a la edición de un proveedor
     */
    editarProveedor(row: Proveedor) {
        this.router.navigate(['/proveedor', row.id]);
    }

    /**
     * Metodo para eliminar un proveedor
     */
    borrarProveedor(row: Proveedor) {
        console.log('Eliminar proveedor', row);
    }

    /**
     * Metodo que redirige a la creación de un nuevo proveedor
     */
    crearProveedor() {
        this.router.navigate(['/proveedor', 'nuevo']);
    }
}