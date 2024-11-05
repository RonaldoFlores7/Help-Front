import { Component } from '@angular/core';
import { ListardonacionComponent } from './listardonacion/listardonacion.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-donacion',
  standalone: true,
  imports: [RouterOutlet, ListardonacionComponent],
  templateUrl: './donacion.component.html',
  styleUrl: './donacion.component.css'
})
export class DonacionComponent {
  constructor(public route: ActivatedRoute) {}
}
