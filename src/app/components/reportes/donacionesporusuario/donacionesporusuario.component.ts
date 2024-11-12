import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../../node_modules/chart.js/dist/types/index.d';
import { DonacionService } from '../../../services/donacion.service';
@Component({
  selector: 'app-donacionesporusuario',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './donacionesporusuario.component.html',
  styleUrl: './donacionesporusuario.component.css'
})
export class DonacionesporusuarioComponent implements OnInit{
  barCharOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barCharType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private dS: DonacionService) {}

  ngOnInit(): void {
   this.dS.obtenerDonacionesPorUsuario().subscribe((data)=>{
    this.barChartLabels=data.map(item=>item.nombreCompleto)
    this.barChartData=[
      {
        data:data.map(item=>item.totalDonaciones),
        label:'Donaciones',
        backgroundColor:['#ffeb3b','#fbc02d'],
        borderColor:'#757575',
        borderWidth:1
      }
    ]
   })
  }
}
