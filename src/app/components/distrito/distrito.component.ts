import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardistritoComponent } from './listardistrito/listardistrito.component';

@Component({
  selector: 'app-distrito',
  standalone: true,
  imports: [RouterOutlet, ListardistritoComponent],
  templateUrl: './distrito.component.html',
  styleUrl: './distrito.component.css'
})
export class DistritoComponent {
  constructor(public route: ActivatedRoute) {}
}
