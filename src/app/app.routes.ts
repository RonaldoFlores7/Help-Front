import { Routes } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { CreareditardepartamentoComponent } from './components/departamento/creareditardepartamento/creareditardepartamento.component';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { TipodonacionComponent } from './components/tipodonacion/tipodonacion.component';
import { CreareditartipodonacionComponent } from './components/tipodonacion/creareditartipodonacion/creareditartipodonacion.component';
import { CreareditartipousuarioComponent } from './components/tipousuario/creareditartipousuario/creareditartipousuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreareditarusuarioComponent } from './components/usuario/creareditarusuario/creareditarusuario.component';
import { TipocampaniaComponent } from './components/tipocampania/tipocampania.component';
import { CreareditartipocampaniaComponent } from './components/tipocampania/creareditartipocampania/creareditartipocampania.component';
import { DistritoComponent } from './components/distrito/distrito.component';
import { CreareditardistritoComponent } from './components/distrito/creareditardistrito/creareditardistrito.component';
import { PedirayudaComponent } from './components/pedirayuda/pedirayuda.component';
import { CreareditarpedirayudaComponent } from './components/pedirayuda/creareditarpedirayuda/creareditarpedirayuda.component';
import { CampaniaComponent } from './components/campania/campania.component';
import { CreareditarcampaniaComponent } from './components/campania/creareditarcampania/creareditarcampania.component';
import { DonacionComponent } from './components/donacion/donacion.component';
import { CreareditardonacionComponent } from './components/donacion/creareditardonacion/creareditardonacion.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { Component } from '@angular/core';
import { DonacionesporusuarioComponent } from './components/reportes/donacionesporusuario/donacionesporusuario.component';



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
        path:'usuarios', component:UsuarioComponent,
        children:[
            {
                path:'nuevo', component:CreareditarusuarioComponent
            },
            {
                path:'ediciones/:id', component:CreareditarusuarioComponent
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
    },
    {
        path:'distritos', component:DistritoComponent,
        children:[
            {
                path:'nuevo', component:CreareditardistritoComponent
            },
            {
                path:'ediciones/:id', component:CreareditardistritoComponent
            }
        ]
    },
    {
        path:'pedirAyudas', component:PedirayudaComponent,
        children:[
            {
                path:'nuevo', component:CreareditarpedirayudaComponent
            },
            {
                path:'ediciones/:id', component:CreareditarpedirayudaComponent
            }
        ]
    },
    {
        path:'campanias', component:CampaniaComponent,
        children:[
            {
                path:'nuevo', component:CreareditarcampaniaComponent
            },
            {
                path:'ediciones/:id', component:CreareditarcampaniaComponent
            }
        ]
    },
    {
        
         path:'donaciones', component:DonacionComponent,
         children:[
             {
                    path:'nuevo', component:CreareditardonacionComponent
             },
             {
                    path:'ediciones/:id', component:CreareditardonacionComponent
             }
        ]
        
    },
    {
        path:'reportes',component:ReportesComponent,
      children:[
        {
          path: 'donacionesPorUsuario', component:DonacionesporusuarioComponent
        }
      ]
    }
];
