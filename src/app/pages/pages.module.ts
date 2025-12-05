import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerarCitaComponent } from './generar-cita/generar-cita.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GenerarCitaComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    GenerarCitaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // router-outlet funcione
    SharedModule, // Componentes del header, sidebar, breadcrumb
    MaterialModule, // Modulo de modulos de Material
  ]
})
export class PagesModule { }
