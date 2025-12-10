import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerarCitaComponent } from './generar-cita/generar-cita.component';
import { EmpresasComponent } from './usuarios/empresas/empresas.component';
import { EmpresaComponent } from './usuarios/empresas/empresa/empresa.component';
import { ProveedoresComponent } from './usuarios/proveedores/proveedores.component';
import { ProveedorComponent } from './usuarios/proveedores/proveedor/proveedor.component';
import { EventosComponent } from './agenda/eventos/eventos.component';
import { EventosDialogComponent } from './agenda/eventos-dialog/eventos-dialog.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GenerarCitaComponent,
    EmpresasComponent,
    EmpresaComponent,
    ProveedoresComponent,
    ProveedorComponent,
    EventosComponent,
    EventosDialogComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    GenerarCitaComponent,
    EmpresasComponent,
    EmpresaComponent,
    ProveedoresComponent,
    ProveedorComponent,
    EventosComponent,
    EventosDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // router-outlet funcione
    SharedModule, // Componentes del header, sidebar, breadcrumb
    MaterialModule // Modulo de modulos de Material
  ]
})
export class PagesModule { }
