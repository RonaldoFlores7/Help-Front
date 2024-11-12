import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportedonacionespormesComponent } from './reportedonacionespormes/reportedonacionespormes.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ReportedonacionespormesComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
