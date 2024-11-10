import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PedirAyuda } from '../../../models/PedirAyuda';
import { Distrito } from '../../../models/Distrito';
import { PedirayudaService } from '../../../services/pedirayuda.service';
import { DistritoService } from '../../../services/distrito.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-creareditarpedirayuda',
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
  templateUrl: './creareditarpedirayuda.component.html',
  styleUrl: './creareditarpedirayuda.component.css',
})
export class CreareditarpedirayudaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pa: PedirAyuda = new PedirAyuda();
  id: number = 0;
  edicion: boolean = false;
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón
  listaDistritos: Distrito[] = [];
  listaUsuarios: Usuario[] = [];
  map: google.maps.Map | undefined;
  advancedMarker: google.maps.marker.AdvancedMarkerElement | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private paS: PedirayudaService,
    private router: Router,
    private diS: DistritoService,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
      this.title = this.edicion
        ? 'Actualizar Pedido de Ayuda'
        : 'Registrar Pedido de Ayuda';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipodesastre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hlatitud: ['', Validators.required],
      hlongitud: ['', Validators.required],
      hfechapedidoayuda: ['', Validators.required],
      hestado: ['', Validators.required],
      husuario: ['', Validators.required],
      hdistrito: ['', Validators.required],
    });
    this.diS.list().subscribe((data) => {
      this.listaDistritos = data;
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.initializeMap();
  }

  ///////////////////////////////////////////////////

  initializeMap(): void {
    // Inicializa el mapa en una ubicación predeterminada
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -12.0464, lng: -77.0428 }, // Ubicación de Lima, Perú
      zoom: 8,
    };
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
    
    let marker = new google.maps.Marker({
      position: mapOptions.center,
      map: this.map,
      title: 'Ubicación seleccionada',
    });
  
    // Listener para actualizar las coordenadas en el formulario y mover el marcador
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();
  
        // Actualiza el formulario con las coordenadas del clic
        this.form.patchValue({
          hlatitud: clickedLat,
          hlongitud: clickedLng,
        });
  
        // Mueve el marcador a la nueva posición clickeada
        marker.setPosition({ lat: clickedLat, lng: clickedLng });
        
        // Asegura que el marcador sea visible en el mapa
        marker.setVisible(true);
      }
    /*
    this.advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      map: this.map,
      position: mapOptions.center,
      title: 'Ubicación del desastre',    //ACA ES LA MODIFCACION DE GLOBITO 
    });
   

    
    // Listener para actualizar las coordenadas en el formulario
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng && this.advancedMarker) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        this.form.patchValue({
          hlatitud: clickedLat,
          hlongitud: clickedLng,
        });

        // Mueve el AdvancedMarker a la nueva posición
        this.advancedMarker.position = { lat: clickedLat, lng: clickedLng };
      }
        */
    });
  
  }  

  //////////////////////////////////

  insertar(): void {
    if (this.form.valid) {
      this.pa.idPedirAyuda = this.form.value.hcodigo;
      this.pa.tipoDesastre = this.form.value.htipodesastre;
      this.pa.descripcion = this.form.value.hdescripcion;
      this.pa.latitud = this.form.value.hlatitud;
      this.pa.longitud = this.form.value.hlongitud;
      this.pa.fechaPedidoAyuda = this.form.value.hfechapedidoayuda;
      this.pa.estado = this.form.value.hestado;
      this.pa.u.idUsuario = this.form.value.husuario;
      this.pa.d.idDistrito = this.form.value.hdistrito;
      if (this.edicion) {
        this.paS.update(this.pa).subscribe((data) => {
          this.paS.list().subscribe((data) => {
            this.paS.setList(data);
          });
        });
      } else {
        this.paS.insert(this.pa).subscribe((d) => {
          this.paS.list().subscribe((d) => {
            this.paS.setList(d);
          });
        });
      }
    }
    this.router.navigate(['pedirAyudas']);
  }
  init() {
    if (this.edicion) {
      this.paS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idPedirAyuda),
          htipodesastre: new FormControl(data.tipoDesastre),
          hdescripcion: new FormControl(data.descripcion),
          hlatitud: new FormControl(data.latitud),
          hlongitud: new FormControl(data.longitud),
          hfechapedidoayuda: new FormControl(data.fechaPedidoAyuda),
          hestado: new FormControl(data.estado),
          husuario: new FormControl(data.u.idUsuario),
          hdistrito: new FormControl(data.d.idDistrito),
        });
        if (this.map && this.advancedMarker) {
          const center = { lat: data.latitud, lng: data.longitud };
          this.map.setCenter(center);
          this.advancedMarker.position = center;
        }
      });
    }
  }
}
