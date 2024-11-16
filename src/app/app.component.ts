import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { TipodonacionComponent } from './components/tipodonacion/tipodonacion.component';
import { TipocampaniaComponent } from './components/tipocampania/tipocampania.component';
import { DistritoComponent } from './components/distrito/distrito.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MatButtonModule } from '@angular/material/button';
import { PedirayudaComponent } from './components/pedirayuda/pedirayuda.component';
import { CampaniaComponent } from './components/campania/campania.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DepartamentoComponent,
    RouterOutlet,
    TipousuarioComponent,
    TipodonacionComponent,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    TipocampaniaComponent,
    UsuarioComponent,
    DistritoComponent,
    PedirayudaComponent,
    CampaniaComponent,
    GoogleMapsModule,
    RouterLink, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FrontendGrupo4';
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isDeveloper() {
    return this.role === 'DEVELOPER';
  }

  isTester() {
    return this.role === 'TESTER';
  }
}
