import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoDonacion } from '../../../models/TipoDonacion';
import { TipodonacionService } from '../../../services/tipodonacion.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listartipodonacion',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listartipodonacion.component.html',
  styleUrl: './listartipodonacion.component.css'
})
export class ListartipodonacionComponent implements OnInit{
  dataSource:MatTableDataSource<TipoDonacion>=new MatTableDataSource()

  displayedColumns:string[]=['c1', 'c2', 'accion01', 'accion02']

  constructor(private tdS: TipodonacionService) {}

  ngOnInit(): void {
    this.tdS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.tdS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }
  eliminar(id:number) {
    this.tdS.delete(id).subscribe(data=>{
      this.tdS.list().subscribe((data)=>{
        this.tdS.setList(data)
      })
    })
  }
}
