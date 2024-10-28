import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Departamento } from '../../../models/Departamento';
import { DepartamentoService } from '../../../services/departamento.service';
@Component({
  selector: 'app-listardepartamento',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listardepartamento.component.html',
  styleUrl: './listardepartamento.component.css'
})
export class ListardepartamentoComponent implements OnInit{
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource();
  displayedColumns:string[]=['c1','c2']

  constructor(private dS: DepartamentoService) {}

  ngOnInit(): void {
    this.dS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.dS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
