import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Departamento } from '../../../models/Departamento';
import { DepartamentoService } from '../../../services/departamento.service';
@Component({
  selector: 'app-creareditardepartamento',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './creareditardepartamento.component.html',
  styleUrl: './creareditardepartamento.component.css'
})
export class CreareditardepartamentoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  departamento: Departamento = new Departamento();
  constructor(
    private dS: DepartamentoService,
    private formBuilder: FormBuilder,
    private router: Router 
  ){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      hid:['',Validators.required],
      hnombre:['',Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.departamento.idDepartamento =this.form.value.hid;
      this.departamento.nombreDepartamento=this.form.value.hnombre;
      this.dS.insert(this.departamento).subscribe(data=>{
        this.dS.list().subscribe(data=>{
          this.dS.setList(data)
        })
      });
    }
    this.router.navigate(['departamentos'])
  }
}
