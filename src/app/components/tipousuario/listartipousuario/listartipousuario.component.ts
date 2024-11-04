import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoUsuario } from '../../../models/TipoUsuario';
import { TipousuarioService } from '../../../services/tipousuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listartipousuario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listartipousuario.component.html',
  styleUrl: './listartipousuario.component.css'
})
export class ListartipousuarioComponent implements OnInit{
  dataSource:MatTableDataSource<TipoUsuario>=new MatTableDataSource()

  displayedColumns:string[]=['c1', 'c2', 'accion01', 'accion02']

  constructor(private tuS: TipousuarioService) {}

  ngOnInit(): void {
    this.tuS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.tuS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }
  eliminar(id:number) {
    this.tuS.delete(id).subscribe(data=>{
      this.tuS.list().subscribe((data)=>{
        this.tuS.setList(data)
      })
    })
  }
}
