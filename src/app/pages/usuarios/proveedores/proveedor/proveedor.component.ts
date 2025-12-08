import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-proveedor',
    templateUrl: './proveedor.component.html',
    styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
    proveedorForm!: FormGroup;
    proveedorId = '';
    isEditMode = false;
    puestosOptions: string[] = ['Gerente', 'Supervisor', 'Representante', 'Administrador', 'Soporte'];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(
            (params) => {
                this.proveedorId = params['id'] || '';
            });
    }

    ngOnInit(): void {
        if (this.proveedorId !== 'nuevo') {
            this.isEditMode = true;
        }
        this.initForm();
    }

    /**
     * Metodo para inicializar el formulario del proveedor
     */
    private initForm(): void {
        this.proveedorForm = this.fb.group({
            nombreEmpresa: ['', Validators.required],
            direccion: [''],
            nombreUsuarioMaster: ['', Validators.required],
            puestoUsuarioMaster: ['', Validators.required],
            correoProveedor: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required, Validators.pattern('^\\+?[0-9\\s\\-]{7,20}$')]],
            usuario: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            correoCliente: ['', Validators.email]
        });
    }

    /**
     * Metodo para actualizar un proveedor existente
     */
    actualizarProveedor(payload: any) {
        console.log('Actualizar proveedor con ID:', this.proveedorId, payload);
    }

    /**
     * Metodo para crear un nuevo proveedor
     */
    crearProveedor(payload: any) {
        console.log('Crear proveedor con datos:', payload);
    }

    /**
     * Metodo para enviar el formulario del proveedor
     */
    onSubmit(): void {
        if (this.proveedorForm.invalid) {
            return;
        }
        const payload = { ...this.proveedorForm.value };

        if (this.isEditMode) {
            this.actualizarProveedor(payload);
        } else {
            this.crearProveedor(payload);
        }
    }

    /**
     * Metodo para cancelar la operación y regresar a la lista de proveedores
     */
    onCancel(): void {
        this.proveedorForm.reset();
        this.router.navigate(['/proveedores']);
    }
}