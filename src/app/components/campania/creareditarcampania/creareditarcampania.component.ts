import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Campania } from '../../../models/Campania';
import { TipoCampania } from '../../../models/TipoCampania';
import { TipoDonacion } from '../../../models/TipoDonacion';
import { Distrito } from '../../../models/Distrito';
import { Usuario } from '../../../models/Usuario';
import { CampaniaService } from '../../../services/campania.service';
import { TipocampaniaService } from '../../../services/tipocampania.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipodonacionService } from '../../../services/tipodonacion.service';
import { DistritoService } from '../../../services/distrito.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-creareditarcampania',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule
  ],
  templateUrl: './creareditarcampania.component.html',
  styleUrl: './creareditarcampania.component.css'
})

export class CreareditarcampaniaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ca: Campania = new Campania();
  id: number = 0;
  edicion: boolean = false;
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón
  listaTipoCampanias: TipoCampania[] = [];
  listaTipoDonaciones: TipoDonacion[] = [];
  listaDistritos: Distrito[] = [];
  listaUsuarios: Usuario[] = [];
  estados: { value: string; viewValue: string }[] = [ // Opciones para el campo de estado
    { value: 'Activo', viewValue: 'Activo' },
    { value: 'Inactivo', viewValue: 'Inactivo' }
  ];
  minFechaFin: Date | null = null; // propiedad para la fecha mínima

  constructor(
    private formBuilder: FormBuilder,
    private cS: CampaniaService,
    private router: Router,
    private tcS: TipocampaniaService,
    private tdS: TipodonacionService,
    private dS: DistritoService,
    private uS: UsuarioService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.title = this.edicion ? 'Actualizar Campaña' : 'Registrar Campaña';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    // Inicializar el formulario con validaciones
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hfechainicio: ['', Validators.required],
      hfechafin: ['', Validators.required],
      hcuentadestino: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]], // Solo acepta 10 dígitos
      hlugardestinoviveres: ['', Validators.required],
      hdescripcioncampania: ['', Validators.required],
      hestadocampania: ['', Validators.required],
      hdamnificado: ['', Validators.required],
      htipocampania: ['', Validators.required],
      htipodonacion: ['', Validators.required],
      hdistrito: ['', Validators.required]
    });

    // Detectar cambios en la fecha de inicio
    this.form.get('hfechainicio')?.valueChanges.subscribe((fechaInicio) => {
      if (fechaInicio) {
        // Actualizar la fecha mínima del datepicker de fecha fin
        this.minFechaFin = new Date(fechaInicio);
      }
    });
  
    this.tcS.list().subscribe((data) => {
      this.listaTipoCampanias = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.tdS.list().subscribe((data) => {
      this.listaTipoDonaciones = data;
    });
    this.dS.list().subscribe((data) => {
      this.listaDistritos = data;
    });
  }

  insertar(): void {


    
    if (this.form.valid) {
      this.ca.idCampania = this.form.value.hcodigo;
      this.ca.fechaInicio = this.form.value.hfechainicio;
      this.ca.fechaFin = this.form.value.hfechafin;
      this.ca.cuentaDestino = this.form.value.hcuentadestino;
      this.ca.lugarDestinoViveres = this.form.value.hlugardestinoviveres;
      this.ca.descripcionCampania = this.form.value.hdescripcioncampania;
      this.ca.estadoCampania = this.form.value.hestadocampania; // Actualizar estado basado en la selección
      this.ca.idDamnificado.idUsuario = this.form.value.hdamnificado;
      this.ca.idTipoCampania.idTipoCampania = this.form.value.htipocampania;
      this.ca.idTipoDonacion.idTipoDonacion = this.form.value.htipodonacion;
      this.ca.idDistrito.idDistrito = this.form.value.hdistrito;

      if (this.edicion) {
        this.cS.update(this.ca).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('Actualizado con éxito', 'Cerrar', { duration: 30000 });
          });
        });
      } else {
        this.cS.insert(this.ca).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('Registrado con éxito', 'Cerrar', { duration: 3000 });
          });
        });
      }
    } else {
      this.snackBar.open('complete los campos correctamente', 'Cerrar', { duration: 30000 });
      return;
    }

    this.router.navigate(['campanias']);
  } 

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form.patchValue({
          hcodigo: data.idCampania,
          hfechainicio: data.fechaInicio,
          hfechafin: data.fechaFin,
          hcuentadestino: data.cuentaDestino,
          hlugardestinoviveres: data.lugarDestinoViveres,
          hdescripcioncampania: data.descripcionCampania,
          hestadocampania: data.estadoCampania,
          hdamnificado: data.idDamnificado.idUsuario,
          htipocampania: data.idTipoCampania.idTipoCampania,
          htipodonacion: data.idTipoDonacion.idTipoDonacion,
          hdistrito: data.idDistrito.idDistrito
        });
      });
    }
  }
}
