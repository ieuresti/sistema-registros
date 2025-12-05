import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NoEncontradoComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule, // Rutas(paths) componentes de autenticacion
    PagesRoutingModule // Rutas(paths) componentes de paginas ya autenticado
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
