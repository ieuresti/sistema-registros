import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

export interface Empresa {
    id: string;
    nombre: string;
    direccion: string;
    correo: string;
    telefono: string;
}

@Component({
    selector: 'app-empresas',
    templateUrl: './empresas.component.html',
    styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['nombre', 'direccion', 'correo', 'telefono', 'acciones'];

    tableData: Empresa[] = [
        { id: '1', nombre: 'ACME S.A.', direccion: 'Calle Falsa 123', correo: 'contacto@acme.com', telefono: '+34 600 000 001' },
        { id: '2', nombre: 'Soluciones Tech', direccion: 'Av. Central 45', correo: 'info@soltech.com', telefono: '+34 600 000 002' },
        { id: '3', nombre: 'Distribuciones López', direccion: 'Paseo 10', correo: 'ventas@dlopez.com', telefono: '+34 600 000 003' },
        { id: '4', nombre: 'Servicios Globales', direccion: 'Plaza Mayor 2', correo: 'hola@sglobal.com', telefono: '+34 600 000 004' }
    ];

    dataSource = new MatTableDataSource<Empresa>(this.tableData);

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
     * Metodo para redirigir a la edición de una empresa
     */
    editarEmpresa(row: Empresa) {
        this.router.navigate(['/empresa', row.id]);
    }

    /**
     * Metodo para eliminar una empresa
     */
    borrarEmpresa(row: Empresa) {
        console.log('Eliminar empresa', row);
    }

    /**
     * Metodo que redirige a la creación de una nueva empresa
     */
    crearEmpresa() {
        this.router.navigate(['/empresa', 'nuevo']);
    }
}