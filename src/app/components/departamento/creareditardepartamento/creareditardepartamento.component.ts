import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Departamento } from '../../../models/Departamento';
import { DepartamentoService } from '../../../services/departamento.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-creareditardepartamento',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creareditardepartamento.component.html',
  styleUrl: './creareditardepartamento.component.css'
})
export class CreareditardepartamentoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  departamento: Departamento = new Departamento();
  id:number=0
  edicion:boolean=false
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón

  constructor(
    private dS: DepartamentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
    this.init();
    this.title = this.edicion ? 'Actualizar Departamento' : 'Registrar Departamento';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });
    
    this.form=this.formBuilder.group({
      hcodigo:[''],
      hnombre:['',Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.departamento.idDepartamento=this.form.value.hcodigo;
      this.departamento.nombreDepartamento=this.form.value.hnombre;
      if (this.edicion) {
        this.dS.update(this.departamento).subscribe((data)=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setList(data)
          })
        })
      } else {
        this.dS.insert(this.departamento).subscribe((data)=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setList(data)
          })
        });
      }
    }
    this.router.navigate(['departamentos'])
  }
  init(){
    if (this.edicion) {
      this.dS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          hcodigo:new FormControl(data.idDepartamento),
          hnombre:new FormControl(data.nombreDepartamento)
        })
      })      
    }
  }
}
