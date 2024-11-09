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

  constructor(
    private formBuilder: FormBuilder,
    private cS: CampaniaService,
    private router: Router,
    private tcS: TipocampaniaService,
    private tdS: TipodonacionService,
    private dS: DistritoService,
    private uS: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.title = this.edicion ? 'Actualizar Campaña' : 'Registrar Campaña';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hfechainicio: ['', Validators.required],
      hfechafin: ['', Validators.required],
      hcuentadestino: ['', Validators.required],
      hlugardestinoviveres: ['', Validators.required],
      hdescripcioncampania: ['', Validators.required],
      hestadocampania: ['', Validators.required],
      hdamnificado: ['', Validators.required],
      htipocampania: ['', Validators.required],
      htipodonacion: ['', Validators.required],
      hdistrito: ['', Validators.required]
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
          });
        });
      } else {
        this.cS.insert(this.ca).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['campanias']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idCampania),
          hfechainicio: new FormControl(data.fechaInicio),
          hfechafin: new FormControl(data.fechaFin),
          hcuentadestino: new FormControl(data.cuentaDestino),
          hlugardestinoviveres: new FormControl(data.lugarDestinoViveres),
          hdescripcioncampania: new FormControl(data.descripcionCampania),
          hestadocampania: new FormControl(data.estadoCampania),
          hdamnificado: new FormControl(data.idDamnificado.idUsuario),
          htipocampania: new FormControl(data.idTipoCampania.idTipoCampania),
          htipodonacion: new FormControl(data.idTipoDonacion.idTipoDonacion),
          hdistrito: new FormControl(data.idDistrito.idDistrito)
        });
      });
    }
  }
}
