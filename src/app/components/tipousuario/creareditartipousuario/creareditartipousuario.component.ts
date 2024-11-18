import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoUsuario } from '../../../models/TipoUsuario';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creareditartipousuario',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creareditartipousuario.component.html',
  styleUrl: './creareditartipousuario.component.css',
})
export class CreareditartipousuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipousuario: TipoUsuario = new TipoUsuario();
  id: number = 0;
  edicion: boolean = false;
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón
  existingUsers: TipoUsuario[] = [];

  constructor(
    private tuS: TipousuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    // Cargar la lista de tipos de usuario al iniciar
    this.tuS.list().subscribe((data) => {
      this.existingUsers = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.title = this.edicion ? 'Actualizar Tipo de Usuario' : 'Registrar Tipo de Usuario';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

     // Inicializar el formulario con validación para caracteres especiales
    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/) // Solo letras, números y espacios
        ]
      ]
    });
  }

  private isDuplicated(rol: string): boolean {
    const nombreLower = rol.trim().toLowerCase();
    if (this.edicion) {
      return this.existingUsers.some(
        (tipousuario) =>
          tipousuario.rol.trim().toLowerCase() === nombreLower &&
        tipousuario.idTipoUsuario !== this.id
      );
    } else {
      return this.existingUsers.some(
        (tipousuario) => tipousuario.rol.trim().toLowerCase() === nombreLower
      );
    }
  }

  insertar(): void {
    const nombre = this.form.value.htipo?.trim();
  
    // Validar si ya existe un tipo de usuario con el mismo nombre
    if (this.isDuplicated(nombre)) {
      this.snackBar.open('El tipo de usuario ya existe', 'Cerrar', {
        duration: 30000,
        panelClass: ['snackbar-error']
      });
      return;
    }
  
    if (this.form.valid) {
      this.tipousuario.idTipoUsuario = this.form.value.hcodigo;
      this.tipousuario.rol = this.form.value.htipo;
     
      console.log(this.tipousuario)

      if (this.edicion) {
        this.tuS.update(this.tipousuario).subscribe((data) => {
          this.tuS.list().subscribe((data) => {
            this.tuS.setList(data);
            this.snackBar.open('Tipo de Usuario actualizado con éxito', 'Cerrar', { duration: 30000 });
          });
        });
      } else {
        this.tuS.insert(this.tipousuario).subscribe((d) => {
          this.tuS.list().subscribe((d) => {
            this.tuS.setList(d);
            this.snackBar.open('Tipo de Usuario registrado con éxito', 'Cerrar', { duration: 30000 });
          });
        });
      }
    } else {
      this.snackBar.open('complete los campos correctamente', 'Cerrar', { duration: 30000 });
    }
  
    this.router.navigate(['tipoUsuarios']);
  }
  
  init() {
    if (this.edicion) {
      this.tuS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idTipoUsuario),
          htipo: new FormControl(data.rol, [
            Validators.required,
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/)
          ])
        });
      });
    }
  }
}
    
