import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpedirayudaComponent } from "./listarpedirayuda/listarpedirayuda.component";

@Component({
  selector: 'app-pedirayuda',
  standalone: true,
  imports: [ListarpedirayudaComponent, RouterOutlet],
  templateUrl: './pedirayuda.component.html',
  styleUrl: './pedirayuda.component.css'
})
export class PedirayudaComponent {
constructor(public route:ActivatedRoute) {}
}
