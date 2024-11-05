import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TipousuarioService } from '../../../services/tipousuario.service';

@Component({
  selector: 'app-creareditarusuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './creareditarusuario.component.html',
  styleUrl: './creareditarusuario.component.css',
})
export class CreareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  us: Usuario = new Usuario();
  listaTipos: TipoUsuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private tuS: TipousuarioService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
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
      this.us.nombre = this.form.value.hnombre;
      this.us.apellidos = this.form.value.hapellidos;
      this.us.correo = this.form.value.hcorreo;
      this.us.contrasenia = this.form.value.hcontrasenia;
      this.us.tu.idTipoUsuario = this.form.value.htipo;
      this.uS.insert(this.us).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['usuarios']);
    }
  }
}
