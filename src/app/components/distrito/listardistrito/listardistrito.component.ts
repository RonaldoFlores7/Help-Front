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
  displayedColumns:string[]=['c1','c2','c3']

  constructor(private dS: DistritoService) {}

  ngOnInit(): void {
    this.dS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.dS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
