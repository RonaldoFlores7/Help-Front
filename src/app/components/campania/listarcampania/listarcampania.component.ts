import { Component, OnInit } from '@angular/core';
import { Campania } from '../../../models/Campania';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CampaniaService } from '../../../services/campania.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarcampania',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarcampania.component.html',
  styleUrl: './listarcampania.component.css'
})
export class ListarcampaniaComponent implements OnInit{
  dataSource:MatTableDataSource<Campania>=new MatTableDataSource()

  displayedColumns:string[]=['cc1', 'cc2', 'cc3', 'cc4', 'cc5', 'cc6', 'cc7', 'cc8', 'cc9', 'cc10', 'cc11', 'accion01', 'accion02']

  constructor(private cS: CampaniaService) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.cS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number) {
    this.cS.delete(id).subscribe(data=>{
      this.cS.list().subscribe((data)=>{
        this.cS.setList(data)
      })
    })
  }

}
