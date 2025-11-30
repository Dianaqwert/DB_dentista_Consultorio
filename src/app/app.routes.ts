import { Routes } from '@angular/router';
import { MenuAyudanteComponent } from './componentes/menu-ayudante/menu-ayudante.component';
import { MenuDentistaComponent } from './componentes/menu-dentista/menu-dentista.component';
import { MenuRecepcionistaComponent } from './componentes/menu-recepcionista/menu-recepcionista.component';
import { LoginComponent } from './componentes/login/login.component';
import { TratamientosDComponent } from './componentes/tratamientos-d/tratamientos-d.component';
import { InventarioDComponent } from './componentes/inventario-d/inventario-d.component';
import { GestionarPacientesDComponent } from './componentes/gestionar-pacientes-d/gestionar-pacientes-d.component';

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
    },
    {
    path: 'gestion-pacientes',
    component: GestionarPacientesDComponent
    },
    {
    path: 'tratamientos',
    component: TratamientosDComponent
    },
    {
    path: 'gestion-materiales',
    component: InventarioDComponent
    }


    ];
