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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón
  existingDonations: TipoDonacion[] = [];

  constructor(
    private tdS: TipodonacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    // Cargar la lista de Tipos de donaciones al iniciar
    this.tdS.list().subscribe((data) => {
    this.existingDonations = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    this.init();
    this.title = this.edicion ? 'Actualizar Tipo de Donacion' : 'Registrar TipoDonacion';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    // Inicializar el formulario con validación
    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/) // Solo letras, números y espacios
        ]
      ]
    });
  }

  insertar(): void {

    const descripcion = this.form.value.htipo?.trim();

    // Validar si ya existe un tipo de donación con el mismo nombre
    if (this.isDuplicated(descripcion)) {
      this.snackBar.open('El tipo de donación ya existe', 'Cerrar', {
        duration: 30000,
        panelClass: ['snackbar-error']
      });
      return;
    }

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

  private isDuplicated(descripcion: string): boolean {
    const descripcionLower = descripcion.trim().toLowerCase();
    if (this.edicion) {
      return this.existingDonations.some(
        (donacion) =>
          donacion.descripcion.trim().toLowerCase() === descripcionLower &&
          donacion.idTipoDonacion !== this.id
      );
    } else {
      return this.existingDonations.some(
        (donacion) => donacion.descripcion.trim().toLowerCase() === descripcionLower
      );
    }
  }

  init() {
    if (this.edicion) {
      this.tdS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idTipoDonacion),
          htipo: new FormControl(data.descripcion, [
            Validators.required,
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/)
          ])
        });
      });
    }
  }
}
