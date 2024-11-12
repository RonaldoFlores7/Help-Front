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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  existingDepartments: Departamento[] = [];

  constructor(
    private dS: DepartamentoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    // Cargar la lista de departamentos al iniciar
    this.dS.list().subscribe((data) => {
      this.existingDepartments = data;
    });

    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.title = this.edicion ? 'Actualizar Departamento' : 'Registrar Departamento';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });
    
    // Inicializar el formulario con validación
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/) // Validación para evitar caracteres especiales
        ]
      ]
    });
  }

  private isDuplicated(nombre: string): boolean {
    const nombreLower = nombre.trim().toLowerCase();
    if (this.edicion) {
      return this.existingDepartments.some(
        (departamento) =>
          departamento.nombreDepartamento.trim().toLowerCase() === nombreLower &&
          departamento.idDepartamento !== this.id
      );
    } else {
      return this.existingDepartments.some(
        (departamento) => departamento.nombreDepartamento.trim().toLowerCase() === nombreLower
      );
    }
  }

  insertar(): void {

    const nombre = this.form.value.hnombre?.trim();

    // Validar si ya existe un departamento con el mismo nombre
    if (this.isDuplicated(nombre)) {
      this.snackBar.open('El departamento ya existe', 'Cerrar', {
        duration: 30000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (this.form.valid) {
      this.departamento.idDepartamento=this.form.value.hcodigo;
      this.departamento.nombreDepartamento=this.form.value.hnombre;
      if (this.edicion) {
        this.dS.update(this.departamento).subscribe((data)=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setList(data)
            this.snackBar.open('Departamento actualizado con éxito', 'Cerrar', { duration: 30000 });
          })
        })
      } else {
        this.dS.insert(this.departamento).subscribe((data)=>{
          this.dS.list().subscribe((data)=>{
            this.dS.setList(data)
            this.snackBar.open('Departamento registrado con éxito', 'Cerrar', { duration: 30000 });
          })
        });
      }
    }else {
      this.snackBar.open('complete los campos correctamente', 'Cerrar', { duration: 30000 });
      return;
    }
    this.router.navigate(['departamentos'])
  }

  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idDepartamento),
          hnombre: new FormControl(data.nombreDepartamento, [
            Validators.required,
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/)
          ])
        });
      });
    }
  }
}
