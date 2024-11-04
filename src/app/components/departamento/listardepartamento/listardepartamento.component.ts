import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Departamento } from '../../../models/Departamento';
import { DepartamentoService } from '../../../services/departamento.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listardepartamento',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listardepartamento.component.html',
  styleUrl: './listardepartamento.component.css'
})
export class ListardepartamentoComponent implements OnInit{
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource();
  displayedColumns:string[]=['c1','c2', 'accion01', 'accion02']

  constructor(private dS: DepartamentoService) {}

  ngOnInit(): void {
    this.dS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.dS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number) {
    this.dS.delete(id).subscribe(data=>{
      this.dS.list().subscribe((data)=>{
        this.dS.setList(data)
      })
    })
  }
}
