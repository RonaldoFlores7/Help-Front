import { Component } from '@angular/core';
import { ListardepartamentoComponent } from "./listardepartamento/listardepartamento.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-departamento',
  standalone: true,
  imports: [RouterOutlet, ListardepartamentoComponent],
  templateUrl: './departamento.component.html',
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent {
  constructor(public route: ActivatedRoute){}
}
