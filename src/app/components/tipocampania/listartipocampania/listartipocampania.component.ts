import { Component } from '@angular/core';
import { TipoCampania } from '../../../models/TipoCampania';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TipocampaniaService } from '../../../services/tipocampania.service';

@Component({
  selector: 'app-listartipocampania',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './listartipocampania.component.html',
  styleUrl: './listartipocampania.component.css'
})
export class ListartipocampaniaComponent {
  dataSource:MatTableDataSource<TipoCampania>=new MatTableDataSource()

  displayedColumns:string[]=['c1', 'c2', 'accion01', 'accion02']

  constructor(private tcS: TipocampaniaService) {}

  ngOnInit(): void {
    this.tcS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.tcS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }
  eliminar(id:number) {
    this.tcS.delete(id).subscribe(data=>{
      this.tcS.list().subscribe((data)=>{
        this.tcS.setList(data)
      })
    })
  }
}
