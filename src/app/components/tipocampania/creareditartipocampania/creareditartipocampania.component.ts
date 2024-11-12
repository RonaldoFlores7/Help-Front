import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoCampania } from '../../../models/TipoCampania';
import { TipocampaniaService } from '../../../services/tipocampania.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creareditartipocampania',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creareditartipocampania.component.html',
  styleUrl: './creareditartipocampania.component.css'
})
export class CreareditartipocampaniaComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  tipocampania: TipoCampania = new TipoCampania();
  id: number = 0;
  edicion: boolean = false;
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón
  existingCampaigns: TipoCampania[] = []; //Para la existencia de campañas

  constructor(
    private tcS: TipocampaniaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Cargar la lista de campañas al iniciar
    this.tcS.list().subscribe((data) => {
      this.existingCampaigns = data;
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.title = this.edicion ? 'Actualizar TipoCampaña' : 'Registrar TipoCampaña';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    // Formulario con validación para caracteres especiales
    this.form = this.formBuilder.group({
    hcodigo: [''],
    htipo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/) // Solo letras (Hasta ñ y tildes), números, espacios
        ]
      ]
    });
  } 

  // Método para verificar si ya existe un tipo de campaña con el mismo nombre
  private isDuplicated(descripcion: string): boolean {
    // Si estamos en modo edición, ignorar el registro actual en la verificación
    if (this.edicion) {
      return this.existingCampaigns.some(
        (campania) =>
          campania.descripcionTipoC.trim().toLowerCase() === descripcion.trim().toLowerCase() &&
          campania.idTipoCampania !== this.id
      );
    } else {
      // En modo creación, verificar todos los registros
      return this.existingCampaigns.some(
        (campania) => campania.descripcionTipoC.trim().toLowerCase() === descripcion.trim().toLowerCase()
      );
    }
  }
  

  insertar(): void {
    const descripcion = this.form.value.htipo?.trim();

    // Verificar si ya existe un tipo de campaña con la misma descripción
    if (this.isDuplicated(descripcion)) {
      this.snackBar.open('El tipo de campaña ya existe', 'Cerrar', {
        duration: 30000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    if (this.form.valid) {
      this.tipocampania.idTipoCampania = this.form.value.hcodigo;
      this.tipocampania.descripcionTipoC = this.form.value.htipo;
      if (this.edicion) {
        this.tcS.update(this.tipocampania).subscribe((data)=>{
          this.tcS.list().subscribe((data)=>{
            this.tcS.setList(data)
            this.snackBar.open('Tipo de Campaña actualizada con éxito', 'Cerrar', { duration: 30000 });
          })
        })
      } else {
        this.tcS.insert(this.tipocampania).subscribe((d) => {
          this.tcS.list().subscribe((d) => {
            this.tcS.setList(d);
            this.snackBar.open('Tipo de Campaña registrada con éxito', 'Cerrar', { duration: 30000 });
          });
        }); 
      }
    } else {
      this.snackBar.open('complete los campos correctamente', 'Cerrar', { duration: 30000 });
      return;
    }
    this.router.navigate(['tipoCampanias']);
  }

  init() {
    if (this.edicion) {
      this.tcS.listId(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          hcodigo: new FormControl(data.idTipoCampania),
          htipo: new FormControl(data.descripcionTipoC, [
            Validators.required,
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/)
          ])
        });
      });
    }
  }
}
