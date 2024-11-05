import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcampaniaComponent } from "./listarcampania/listarcampania.component";

@Component({
  selector: 'app-campania',
  standalone: true,
  imports: [ListarcampaniaComponent, RouterOutlet],
  templateUrl: './campania.component.html',
  styleUrl: './campania.component.css'
})
export class CampaniaComponent {
  constructor(public route:ActivatedRoute) {}
}
