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

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private tuS: TipousuarioService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    this.init();
    this.title = this.edicion ? 'Actualizar Usuario' : 'Registrar Usuario';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hapellidos: ['', Validators.required],
      hcorreo: ['', Validators.required],
      hcontrasenia: ['', Validators.required],
      htipo: ['', Validators.required],
    });
    this.tuS.list().subscribe((data)=>{
      this.listaTipos=data
    })
  }

  insertar(): void {
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
          });
        });
      } else {
        this.uS.insert(this.us).subscribe((d) => {
          this.uS.list().subscribe((d) => {
            this.uS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idUsuario),
          hnombre: new FormControl(data.nombre),
          hapellidos: new FormControl(data.apellidos),
          hcorreo: new FormControl(data.correo),
          hcontrasenia: new FormControl(data.contrasenia),
          htipo: new FormControl(data.tu.idTipoUsuario),
        });
      });
    }
  }
}
