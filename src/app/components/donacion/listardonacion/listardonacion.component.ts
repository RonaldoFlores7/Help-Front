import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Donacion } from '../../../models/Donacion';
import { DonacionService } from '../../../services/donacion.service';

@Component({
  selector: 'app-listardonacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listardonacion.component.html',
  styleUrl: './listardonacion.component.css'
})
export class ListardonacionComponent implements OnInit {
  dataSource: MatTableDataSource<Donacion> = new MatTableDataSource();
  displayedColumns:string[]=['c1','c2','c3','c5','c6','c7','c8','c9', 'accion02']

  constructor(private doS: DonacionService) {}

  ngOnInit(): void {
    this.doS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.doS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  eliminar(id:number) {
    this.doS.delete(id).subscribe(data=>{
      this.doS.list().subscribe((data)=>{
        this.doS.setList(data)
      })
    })
  }
}
