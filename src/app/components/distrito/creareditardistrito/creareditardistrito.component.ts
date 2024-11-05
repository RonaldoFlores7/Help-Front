import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Departamento } from '../../../models/Departamento';
import { Distrito } from '../../../models/Distrito';
import { DistritoService } from '../../../services/distrito.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DepartamentoService } from '../../../services/departamento.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-creareditardistrito',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creareditardistrito.component.html',
  styleUrl: './creareditardistrito.component.css'
})
export class CreareditardistritoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  di: Distrito = new Distrito();
  id: number = 0;
  edicion: boolean = false;
  title: string = '';
  buttonText: string = '';
  listaDepartamentos: Departamento[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private diS: DistritoService,
    private router: Router,
    private deS: DepartamentoService,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {

    this.route.params.subscribe((data:Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    this.init();
    this.title = this.edicion ? 'Actualizar Distrito' : 'Registrar Distrito';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    })


    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdepartamento: ['', Validators.required],
    });
    this.deS.list().subscribe((data) => {
      this.listaDepartamentos = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.di.idDistrito = this.form.value.hcodigo;
      this.di.nombreDistrito = this.form.value.hnombre;
      this.di.de.idDepartamento = this.form.value.hdepartamento;
      if (this.edicion) {
        this.diS.update(this.di).subscribe((data) => {
          this.diS.list().subscribe((data) => {
            this.diS.setList(data);
          });
        }); 
      } else {
        this.diS.insert(this.di).subscribe((data) => {
          this.diS.list().subscribe((data) => {
            this.diS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['distritos']);
  }
  init() {
    if (this.edicion) {
      this.diS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idDistrito),
          hnombre: new FormControl(data.nombreDistrito),
          hdepartamento: new FormControl(data.de.idDepartamento),
        });
      });
    }
  }
}
