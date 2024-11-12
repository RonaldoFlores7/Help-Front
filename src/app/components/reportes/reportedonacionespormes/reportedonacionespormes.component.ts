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
  selector: 'app-reportedonacionespormes',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './reportedonacionespormes.component.html',
  styleUrl: './reportedonacionespormes.component.css'
})
export class ReportedonacionespormesComponent implements OnInit{
  barCharOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barCharType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private dS: DonacionService) {}
  ngOnInit(): void {
    this.dS.obtenerDonacionesPorMes().subscribe((data)=>{
     this.barChartLabels=data.map(item=>item.mes)
     this.barChartData=[
       {
         data:data.map(item=>item.totalDonaciones),
         label:'Total Donaciones',
         backgroundColor:['#ffeb3b','#fbc02d','#fdd835'],
         borderColor:'#757575',
         borderWidth:1
       }
     ]
    })
   }
}
