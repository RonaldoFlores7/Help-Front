import { Routes } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { CreareditardepartamentoComponent } from './components/departamento/creareditardepartamento/creareditardepartamento.component';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { TipodonacionComponent } from './components/tipodonacion/tipodonacion.component';
import { CreareditartipodonacionComponent } from './components/tipodonacion/creareditartipodonacion/creareditartipodonacion.component';
import { CreareditartipousuarioComponent } from './components/tipousuario/creareditartipousuario/creareditartipousuario.component';
import { TipocampaniaComponent } from './components/tipocampania/tipocampania.component';
import { CreareditartipocampaniaComponent } from './components/tipocampania/creareditartipocampania/creareditartipocampania.component';


export const routes: Routes = [
    {
        path:'departamentos', component:DepartamentoComponent,
        children:[
            {
                path:'nuevo', component:CreareditardepartamentoComponent
            },
            {
                path:'ediciones/:id', component:CreareditardepartamentoComponent
            }
        ]
    },
    {
        path:'tipoUsuarios', component:TipousuarioComponent,
        children:[
            {
                path:'nuevo', component:CreareditartipousuarioComponent
            },
            {
                path:'ediciones/:id', component:CreareditartipousuarioComponent
            }
        ]
    },
    {
        path:'tipoDonacion', component:TipodonacionComponent,
        children:[
            {
                path:'nuevo', component:CreareditartipodonacionComponent
            },
            {
                path:'ediciones/:id', component:CreareditartipodonacionComponent
            }
        ]
    },
    {
        path:'tipoCampanias', component:TipocampaniaComponent,
        children:[
            {
                path:'nuevo', component:CreareditartipocampaniaComponent
            },
            {
                path:'ediciones/:id', component:CreareditartipocampaniaComponent
            }
        ]
    }
];
