import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    NoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, // Rutas principales
    AuthModule, // Componentes de autenticación (login, registro...)
    PagesModule // Componentes de las paginas (ya autenticado)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
