import { Component, OnInit } from '@angular/core';
import { PedirAyuda } from '../../../models/PedirAyuda';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PedirayudaService } from '../../../services/pedirayuda.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarpedirayuda',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './listarpedirayuda.component.html',
  styleUrl: './listarpedirayuda.component.css'
})
export class ListarpedirayudaComponent implements OnInit{
  dataSource:MatTableDataSource<PedirAyuda>=new MatTableDataSource()

  displayedColumns:string[]=['cpa1', 'cpa2', 'cpa3', 'cpa4', 'cpa5', 'cpa6', 'cpa7', 'cpa8', 'cpa9', 'accion01', 'accion02']

  constructor(private paS: PedirayudaService) {}

  ngOnInit(): void {
    this.paS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.paS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number) {
    this.paS.delete(id).subscribe(data=>{
      this.paS.list().subscribe((data)=>{
        this.paS.setList(data)
      })
    })
  }
}
