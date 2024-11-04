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

  constructor(
    private tuS: TipousuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    this.init()
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.tipousuario.idTipoUsuario = this.form.value.hcodigo;
      this.tipousuario.nombre = this.form.value.htipo;
      if (this.edicion) {
        this.tuS.update(this.tipousuario).subscribe((data)=> {
          this.tuS.list().subscribe((data)=>{
            this.tuS.setList(data);
          })
        })
      } else {
        this.tuS.insert(this.tipousuario).subscribe((d) => {
          this.tuS.list().subscribe((d) => {
            this.tuS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['tipoUsuarios']);
  }
  init() {
    if (this.edicion) {
      this.tuS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idTipoUsuario),
          htipo: new FormControl(data.nombre),
        });
      });
    }
  }
}
