import { Routes } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { CreareditardepartamentoComponent } from './components/departamento/creareditardepartamento/creareditardepartamento.component';


export const routes: Routes = [
    {
        path:'departamentos', component:DepartamentoComponent,
        children:[
            {
                path:'nuevo', component:CreareditardepartamentoComponent
            }
        ]
    }
];
