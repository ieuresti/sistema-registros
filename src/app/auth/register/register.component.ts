import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordsIguales('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
  }

  /**
   * Metodo para obtener un control del formulario
   */
  getControl(name: string) {
    return this.registerForm.get(name);
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
   * Metodo para validar que las contraseñas sean iguales
   * @returns true si las contraseñas no coinciden
   */
  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('confirmPassword')?.value;
    return (pass1 !== pass2 && this.registerForm);
  }

  /**
   * Metodo que valida que dos campos de contraseña sean iguales
   */
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }

  /**
   * Metodo que se ejecuta al enviar el formulario de registro
   */
  crearUsuario(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.router.navigateByUrl('/generar-cita');
  }
}
