import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerarCitaComponent } from './generar-cita/generar-cita.component';

const childRoutes: Routes = [
    // Rutas hijas
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'generar-cita', component: GenerarCitaComponent, data: { titulo: 'Registra o agenda tu visita' } }
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }