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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoDonacion } from '../../../models/TipoDonacion';
import { TipodonacionService } from '../../../services/tipodonacion.service';
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
  templateUrl: './creareditartipodonacion.component.html',
  styleUrl: './creareditartipodonacion.component.css',
})
export class CreareditartipodonacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipodonacion: TipoDonacion = new TipoDonacion();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private tdS: TipodonacionService,
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
      this.tipodonacion.idTipoDonacion = this.form.value.hcodigo;
      this.tipodonacion.descripcion = this.form.value.htipo;
      if (this.edicion) {
        this.tdS.update(this.tipodonacion).subscribe((data)=>{
          this.tdS.list().subscribe((data)=>{
            this.tdS.setList(data)
          })
        })
      } else {
        this.tdS.insert(this.tipodonacion).subscribe((d) => {
          this.tdS.list().subscribe((d) => {
            this.tdS.setList(d);
          });
        }); 
      }
    }
    this.router.navigate(['tipoDonacion']);
  }
  init() {
    if (this.edicion) {
      this.tdS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idTipoDonacion),
          htipo: new FormControl(data.descripcion),
        });
      });
    }
  }
}
