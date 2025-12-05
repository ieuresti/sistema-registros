import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  photo: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  buscadorEstaActivo = false;
  terminoABuscar = '';
  lenguajeSeleccionado = 'es';
  banderaLenguajeSeleccionado = '🇪🇸';

  user: User = {
    name: 'Usuario Demo',
    email: 'usuario@demo.com',
    photo: '/assets/images/user.jpg'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Metodo para activar o desactivar el buscador
   */
  toggleBuscador() {
    this.buscadorEstaActivo = !this.buscadorEstaActivo;
    if (!this.buscadorEstaActivo) {
      this.terminoABuscar = '';
    }
  }

  /**
   * Metodo para limpiar el buscador
   */
  limpiarBuscador() {
    this.terminoABuscar = '';
    this.buscadorEstaActivo = false;
  }

  /**
   * Metodo para seleccionar el idioma
   */
  seleccionarIdioma(code: string) {
    this.lenguajeSeleccionado = code;
    this.banderaLenguajeSeleccionado = code === 'en' ? '🇺🇸' : '🇪🇸';
  }

  /**
   * Metodo para cerrar sesión
   */
  cerrarSesion() {
    console.log('logout');
    this.router.navigate(['/login']);
  }
}
