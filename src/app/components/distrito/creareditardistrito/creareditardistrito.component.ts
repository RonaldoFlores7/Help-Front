import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Departamento } from '../../../models/Departamento';
import { Distrito } from '../../../models/Distrito';
import { DistritoService } from '../../../services/distrito.service';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../../services/departamento.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creareditardistrito',
  standalone: true,
  imports: [MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creareditardistrito.component.html',
  styleUrl: './creareditardistrito.component.css'
})
export class CreareditardistritoComponent {
  form: FormGroup = new FormGroup({});
  listaDepartamentos: Departamento[] = [];
  distrito:Distrito = new Distrito();

  constructor(
    private formBuilder: FormBuilder,
    private dS: DistritoService,
    private router: Router,
    private deS: DepartamentoService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hnombre: ['', Validators.required],
      hdepartamento: ['', Validators.required],
    });
    this.deS.list().subscribe((data) => {
      this.listaDepartamentos = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.distrito.nombreDistrito = this.form.value.hnombre;
      this.distrito.departamento.idDepartamento = this.form.value.hdepartamento;
      this.dS.insert(this.distrito).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });
      this.router.navigate(['distritos']);
    }
  }
}
