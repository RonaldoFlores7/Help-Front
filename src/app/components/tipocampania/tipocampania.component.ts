import { Component } from '@angular/core';
import { ListartipocampaniaComponent } from './listartipocampania/listartipocampania.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tipocampania',
  standalone: true,
  imports: [ListartipocampaniaComponent, RouterOutlet],
  templateUrl: './tipocampania.component.html',
  styleUrl: './tipocampania.component.css'
})
export class TipocampaniaComponent {
  constructor(public route:ActivatedRoute) {}
}
