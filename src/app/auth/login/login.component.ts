import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  /**
   * Metodo para obtener un control del formulario
   */
  getControl(name: string) {
    return this.loginForm.get(name);
  }

  /**
   * Metodo para verificar si un control tiene un error especifico
   */
  hasError(name: string, error: string): boolean {
    const control = this.getControl(name);
    // Retorna true si el control existe, ha sido tocado o modificado, y tiene el error especificado
    return !!(control && (control.touched || control.dirty) && control.hasError(error));
  }

  /**
   * Metodo que se ejecuta al enviar el formulario de login
   */
  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credenciales = this.loginForm.value;
    console.log('Payload login: ', credenciales);
    this.router.navigateByUrl('/dashboard');
  }
}
