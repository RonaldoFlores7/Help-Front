import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CampaniaService } from '../../../services/campania.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-voluntariosporcampania',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './voluntariosporcampania.component.html',
  styleUrl: './voluntariosporcampania.component.css'
})
export class VoluntariosporcampaniaComponent implements OnInit{
  barCharOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barCharType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private cS: CampaniaService) {}


  ngOnInit(): void {
    this.cS.getQuantityVolunteerByCampania().subscribe((data)=>{
     this.barChartLabels=data.map(item=>item.descripcionCampania)
     this.barChartData=[
       {
         data:data.map(item=>item.QuantityVolunteer),
         label:'Voluntarios',
         backgroundColor:['#ffeb3b','#ab12ef','#2dbfbb', '#12f9b5'],
         borderColor:'#757575',
         borderWidth:1
       }
     ]
    })
   }
}
