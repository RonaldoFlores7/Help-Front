import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit{
  dataSource:MatTableDataSource<Usuario>=new MatTableDataSource()

  displayedColumns:string[]=['cu1', 'cu2', 'cu3', 'cu4', 'cu5', 'cu6','accion01', 'accion02']

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.uS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.uS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id:number) {
    this.uS.delete(id).subscribe(data=>{
      this.uS.list().subscribe((data)=>{
        this.uS.setList(data)
      })
    })
  }
}
