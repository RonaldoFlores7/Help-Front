import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoCampania } from '../../../models/TipoCampania';
import { TipocampaniaService } from '../../../services/tipocampania.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
export class CreareditartipocampaniaComponent {
  form: FormGroup = new FormGroup({});
  tipocampania: TipoCampania = new TipoCampania();
  id: number = 0;
  edicion: boolean = false;
  title: string = ''; // Para el título
  buttonText: string = ''; // Para el texto del botón

  constructor(
    private tcS: TipocampaniaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
    this.init();
    this.title = this.edicion ? 'Actualizar TipoCampaña' : 'Registrar TipoCampaña';
      this.buttonText = this.edicion ? 'Actualizar' : 'Registrar';
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      htipo: ['', Validators.required],
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.tipocampania.idTipoCampania = this.form.value.hcodigo;
      this.tipocampania.descripcionTipoC = this.form.value.htipo;
      if (this.edicion) {
        this.tcS.update(this.tipocampania).subscribe((data)=>{
          this.tcS.list().subscribe((data)=>{
            this.tcS.setList(data)
          })
        })
      } else {
        this.tcS.insert(this.tipocampania).subscribe((d) => {
          this.tcS.list().subscribe((d) => {
            this.tcS.setList(d);
          });
        }); 
      }
    }
    this.router.navigate(['tipoCampania']);
  }
  init() {
    if (this.edicion) {
      this.tcS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idTipoCampania),
          htipo: new FormControl(data.descripcionTipoC),
        });
      });
    }
  }
}
