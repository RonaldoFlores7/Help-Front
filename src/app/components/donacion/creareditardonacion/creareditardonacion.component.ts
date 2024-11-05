import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Donacion } from '../../../models/Donacion';
import { Usuario } from '../../../models/Usuario';
import { Campania } from '../../../models/Campania';
import { TipoDonacion } from '../../../models/TipoDonacion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DonacionService } from '../../../services/donacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CampaniaService } from '../../../services/campania.service';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { TipodonacionService } from '../../../services/tipodonacion.service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creareditardonacion',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule, 
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './creareditardonacion.component.html',
  styleUrl: './creareditardonacion.component.css'
})
export class CreareditardonacionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  do: Donacion = new Donacion();
  id: number = 0;
  edicion: boolean = false;
  title: string = '';
  buttonText: string = '';
  listaDonadores: Usuario[] = [];
  listaCampanias: Campania[]=[];
  listaTipoDonaciones: TipoDonacion[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private doS: DonacionService,
    private router: Router,
    private usuS: UsuarioService,
    private cS: CampaniaService,
    private tdS: TipodonacionService,
    private route:ActivatedRoute
  ) {}
  ngOnInit(): void {

    this.route.params.subscribe((data:Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    this.init();
    this.title = this.edicion ? 'Actualizar Donacion' : 'Registrar Donacion';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    })


    this.form = this.formBuilder.group({
      hcodigo: [''],
      htelefono: ['', Validators.required],
      hmontotransferido: ['', Validators.required],
      hdescripciondonacion: ['', Validators.required],
      hfechadonacion: ['', Validators.required],
      hestado: ['', Validators.required],
      husuario: ['', Validators.required],
      hcampania: ['', Validators.required],
      htipodonacion: ['', Validators.required],
    });
    this.usuS.list().subscribe((data) => {
      this.listaDonadores = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCampanias = data;
    });
    this.tdS.list().subscribe((data) => {
      this.listaTipoDonaciones = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.do.idDonacion = this.form.value.hcodigo;
      this.do.telefono = this.form.value.htelefono;
      this.do.montoTransferido = this.form.value.hmontotransferido;
      this.do.descripcionDonacion = this.form.value.hdescripciondonacion;
      this.do.fechaDonacion = this.form.value.hfechadonacion;
      this.do.estado = this.form.value.hestado;
      this.do.us.idUsuario = this.form.value.husuario;
      this.do.ca.idCampania = this.form.value.hcampania;
      this.do.td.idTipoDonacion = this.form.value.htipodonacion;
      if (this.edicion) {
        this.doS.update(this.do).subscribe((data) => {
          this.doS.list().subscribe((data) => {
            this.doS.setList(data);
          });
        }); 
      } else {
        this.doS.insert(this.do).subscribe((data) => {
          this.doS.list().subscribe((data) => {
            this.doS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['donaciones']);
  }
  init() {
    if (this.edicion) {
      this.doS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idDonacion),
          htelefono: new FormControl(data.telefono),
          hmontotransferido: new FormControl(data.montoTransferido),
          hdescripciondonacion: new FormControl(data.descripcionDonacion),
          hfechadonacion: new FormControl(data.fechaDonacion),
          hestado: new FormControl(data.estado),
          husuario: new FormControl(data.us.idUsuario),
          hcampania: new FormControl(data.ca.idCampania),
          htipodonacion: new FormControl(data.td.idTipoDonacion),
        });
      });
    }
  }
}
