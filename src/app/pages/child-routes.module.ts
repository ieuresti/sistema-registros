import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerarCitaComponent } from './generar-cita/generar-cita.component';
import { EmpresasComponent } from './usuarios/empresas/empresas.component';
import { EmpresaComponent } from './usuarios/empresas/empresa/empresa.component';
import { ProveedoresComponent } from './usuarios/proveedores/proveedores.component';
import { ProveedorComponent } from './usuarios/proveedores/proveedor/proveedor.component';

const childRoutes: Routes = [
    // Rutas hijas
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'generar-cita', component: GenerarCitaComponent, data: { titulo: 'Registra o agenda tu visita' } },
    { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Empresas' } },
    { path: 'empresa/:id', component: EmpresaComponent, data: { titulo: 'Empresa' } },
    { path: 'proveedores', component: ProveedoresComponent, data: { titulo: 'Proveedores' } },
    { path: 'proveedor/:id', component: ProveedorComponent, data: { titulo: 'Proveedor' } }
];

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }