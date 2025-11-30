import { Routes } from '@angular/router';
import { MenuAyudanteComponent } from './componentes/menu-ayudante/menu-ayudante.component';
import { MenuDentistaComponent } from './componentes/menu-dentista/menu-dentista.component';
import { MenuRecepcionistaComponent } from './componentes/menu-recepcionista/menu-recepcionista.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {
    path: 'menu-dentista',
    component: MenuDentistaComponent
    },
    {
    path: 'menu-ayudante',
    component: MenuAyudanteComponent
    },
    {
    path: 'menu-recepcionista',
    component: MenuRecepcionistaComponent
    }

    ];
