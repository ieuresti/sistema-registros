import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Visit {
  avatar: string;
  name: string;
  visitType: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  visitantes = [
    { tipo: 'Visitas de Presentacion', cantidad: 24, icono: 'business' },
    { tipo: 'Visitas de Cotizacion', cantidad: 12, icono: 'request_quote' },
    { tipo: 'Visitas de Trabajo', cantidad: 8, icono: 'work' },
    { tipo: 'Visitas de Entrega de Material', cantidad: 5, icono: 'local_shipping' }
  ];

  displayedColumns: string[] = ['avatar', 'name', 'visitType', 'email', 'phone'];

  tableData: Visit[] = [
    { avatar: 'https://i.pravatar.cc/40?img=1', name: 'Ana Gómez', visitType: 'Presentación', email: 'ana.gomez@example.com', phone: '+34 600 111 222' },
    { avatar: 'https://i.pravatar.cc/40?img=2', name: 'Luis Pérez', visitType: 'Cotización', email: 'luis.perez@example.com', phone: '+34 600 333 444' },
    { avatar: 'https://i.pravatar.cc/40?img=5', name: 'María Ruiz', visitType: 'Trabajo', email: 'maria.ruiz@example.com', phone: '+34 600 555 666' },
    { avatar: 'https://i.pravatar.cc/40?img=4', name: 'Carlos Díaz', visitType: 'Entrega de material', email: 'carlos.diaz@example.com', phone: '+34 600 777 888' },
    { avatar: 'https://i.pravatar.cc/40?img=8', name: 'Pedro Martinez', visitType: 'Presentación', email: 'pedro.martinez@example.com', phone: '+34 600 555 666' },
    { avatar: 'https://i.pravatar.cc/40?img=9', name: 'Samanta Cepeda', visitType: 'Cotización', email: 'samanta.cepeda@example.com', phone: '+34 600 777 888' },
    { avatar: 'https://i.pravatar.cc/40?img=7', name: 'Fernando Lopez', visitType: 'Trabajo', email: 'fernando.lopez@example.com', phone: '+34 600 555 666' }
  ];

  dataSource = new MatTableDataSource<Visit>(this.tableData);

  constructor() { }

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
   * Metodo para obtener la clase CSS del chip segun el tipo de visita
   */
  getChipClass(tipoVisita: string): string {
    switch (tipoVisita) {
      case 'Presentación':
        return 'chip-blue';
      case 'Trabajo':
        return 'chip-yellow';
      case 'Cotización':
        return 'chip-green';
      case 'Entrega de material':
        return 'chip-red';
      default:
        return 'chip-red';
    }
  }

}
