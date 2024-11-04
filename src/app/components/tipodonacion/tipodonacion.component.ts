import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipodonacionComponent } from "./listartipodonacion/listartipodonacion.component";

@Component({
  selector: 'app-tipodonacion',
  standalone: true,
  imports: [ListartipodonacionComponent, RouterOutlet],
  templateUrl: './tipodonacion.component.html',
  styleUrl: './tipodonacion.component.css'
})
export class TipodonacionComponent {
  constructor(public route:ActivatedRoute) {}
}
