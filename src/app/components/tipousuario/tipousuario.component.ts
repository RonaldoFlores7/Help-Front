import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipousuarioComponent } from './listartipousuario/listartipousuario.component';

@Component({
  selector: 'app-tipousuario',
  standalone: true,
  imports: [ListartipousuarioComponent, RouterOutlet],
  templateUrl: './tipousuario.component.html',
  styleUrl: './tipousuario.component.css'
})
export class TipousuarioComponent {
  constructor(public route:ActivatedRoute) {}
}
