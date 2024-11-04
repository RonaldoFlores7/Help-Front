import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { TipodonacionComponent } from './components/tipodonacion/tipodonacion.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DepartamentoComponent, RouterOutlet, TipousuarioComponent, TipodonacionComponent, MatToolbarModule, MatMenuModule, MatIconModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendGrupo4';
}
