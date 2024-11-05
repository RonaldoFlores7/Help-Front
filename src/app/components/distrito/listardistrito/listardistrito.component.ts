import { Component, OnInit } from '@angular/core';
import { Distrito } from '../../../models/Distrito';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DistritoService } from '../../../services/distrito.service';

@Component({
  selector: 'app-listardistrito',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listardistrito.component.html',
  styleUrl: './listardistrito.component.css'
})
export class ListardistritoComponent implements OnInit{
  dataSource: MatTableDataSource<Distrito> = new MatTableDataSource();
  displayedColumns:string[]=['cdi1','cdi2','cdi3', 'accion01', 'accion02']

  constructor(private diS: DistritoService) {}

  ngOnInit(): void {
    this.diS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.diS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number) {
    this.diS.delete(id).subscribe(data=>{
      this.diS.list().subscribe((data)=>{
        this.diS.setList(data)
      })
    })
  }
}
