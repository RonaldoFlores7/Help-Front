import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CampaniaService } from '../../../services/campania.service';

@Component({
  selector: 'app-donacionesporcampania',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './donacionesporcampania.component.html',
  styleUrl: './donacionesporcampania.component.css'
})
export class DonacionesporcampaniaComponent implements OnInit{
  barCharOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barCharType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private cS: CampaniaService) {}

  ngOnInit(): void {
    this.cS.getSumDonationsByCampania().subscribe((data)=>{
     this.barChartLabels=data.map(item=>item.descripcionCampania)
     this.barChartData=[
       {
         data:data.map(item=>item.montoTransferido),
         label:'Donaciones',
         backgroundColor:['#ffeb3b','#ab12ef','#2dbfbb', '#12f9b5'],
         borderColor:'#757575',
         borderWidth:1
       }
     ]
    })
   }

}
