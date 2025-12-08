import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
    empresaForm!: FormGroup;
    empresaId = '';
    isEditMode = false;
    areasOptions: string[] = ['Ventas', 'Soporte', 'Recursos Humanos', 'Administración', 'IT'];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(
            (params) => {
                this.empresaId = params['id'] || '';
            }
        );
    }

    ngOnInit(): void {
        if (this.empresaId !== 'nuevo') {
            this.isEditMode = true;
        }
        this.initForm();
    }

    /**
     * Metodo para inicializar el formulario de la empresa
     */
    private initForm(): void {
        this.empresaForm = this.fb.group({
            nombre: ['', Validators.required],
            direccion: [''],
            correo: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required, Validators.pattern('^\\+?[0-9\\s\\-]{7,20}$')]],
            areasEmpresa: [''],
            usuarioMaster: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    /**
     * Metodo para actualizar una empresa existente
     */
    actualizarEmpresa(payload: any) {
        console.log('Actualizar empresa con ID:', this.empresaId, payload);
    }

    /**
     * Metodo para crear una nueva empresa
     */
    crearEmpresa(payload: any) {
        console.log('Crear empresa', payload);
    }

    /**
     * Metodo para enviar el formulario de la empresa
     */
    onSubmit(): void {
        if (this.empresaForm.invalid) {
            return;
        }
        const payload = this.empresaForm.value;

        if (this.isEditMode) {
            this.actualizarEmpresa(payload);
        } else {
            this.crearEmpresa(payload);
        }
    }

    /**
     * Metodo para cancelar la edición o creación de una empresa
     */
    onCancel(): void {
        this.empresaForm.reset();
        this.router.navigate(['/empresas']);
    }
}