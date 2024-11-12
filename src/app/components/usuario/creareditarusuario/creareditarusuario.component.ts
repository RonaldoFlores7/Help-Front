import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoUsuario } from '../../../models/TipoUsuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creareditarusuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './creareditarusuario.component.html',
  styleUrl: './creareditarusuario.component.css',
})
export class CreareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  us: Usuario = new Usuario();
  id: number=0;
  edicion: boolean=false;
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón
  listaTipos: TipoUsuario[] = [];
  showPassword: boolean = false; // Control para mostrar/ocultar contraseña
  existingUsers: Usuario[] = [];
  originalCorreo: string = ''; // Nuevo: almacena el correo original del usuario (Sirve para edicion)

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private tuS: TipousuarioService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    // Cargar lista de usuarios y tipos de usuario
    this.uS.list().subscribe((data) => {
      this.existingUsers = data;
    });

    this.tuS.list().subscribe((data) => {
      this.listaTipos = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.title = this.edicion ? 'Actualizar Usuario' : 'Registrar Usuario';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      hapellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      hcorreo: ['', [Validators.required, Validators.email]],
      hcontrasenia: ['', Validators.required],
      htipo: ['', Validators.required],
    });

  }

  private isDuplicated(correo: string): boolean {
    const correoLower = correo.trim().toLowerCase();

    // Si estamos en modo edición y el correo no ha cambiado, no es duplicado
    if (this.edicion && correoLower === this.originalCorreo.toLowerCase()) {
      return false;
    }

    // Verificar duplicados en la lista general
    return this.existingUsers.some(
      (user) => user.correo.trim().toLowerCase() === correoLower
    );
  }

  insertar(): void {

    const correo = this.form.value.hcorreo?.trim();

    // Verificar si el correo ya existe, pero omitir si no ha cambiado en modo edición
    if (this.isDuplicated(correo)) {
      this.snackBar.open('El correo ya está registrado', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (this.form.valid) {
      this.us.idUsuario = this.form.value.hcodigo;
      this.us.nombre = this.form.value.hnombre;
      this.us.apellidos = this.form.value.hapellidos;
      this.us.correo = this.form.value.hcorreo;
      this.us.contrasenia = this.form.value.hcontrasenia;
      this.us.tu.idTipoUsuario = this.form.value.htipo;
      if (this.edicion) {
        this.uS.update(this.us).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
            this.snackBar.open('Información del Usuario actualizada con éxito', 'Cerrar', { duration: 30000 });
          });
        });
      } else {
        this.uS.insert(this.us).subscribe((d) => {
          this.uS.list().subscribe((d) => {
            this.uS.setList(d);
            this.snackBar.open('Usuario registrado con éxito', 'Cerrar', { duration: 30000 });
          });
        });
      }
    } else {
      this.snackBar.open('complete los campos correctamente', 'Cerrar', { duration: 30000 });
      return;
    }
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.originalCorreo = data.correo; // Guardar el correo original

        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idUsuario),
          hnombre: new FormControl(data.nombre, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          hapellidos: new FormControl(data.apellidos, [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]),
          hcorreo: new FormControl(data.correo, [Validators.required, Validators.email]),
          hcontrasenia: new FormControl(data.contrasenia, Validators.required),
          htipo: new FormControl(data.tu.idTipoUsuario, Validators.required),
        });
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}