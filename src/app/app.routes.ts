import { Routes } from '@angular/router';
import { MenuAyudanteComponent } from './componentes/menu-ayudante/menu-ayudante.component';
import { MenuDentistaComponent } from './componentes/menu-dentista/menu-dentista.component';
import { MenuRecepcionistaComponent } from './componentes/menu-recepcionista/menu-recepcionista.component';
import { LoginComponent } from './componentes/login/login.component';
import { TratamientosDComponent } from './componentes/tratamientos-d/tratamientos-d.component';
import { InventarioDComponent } from './componentes/inventario-d/inventario-d.component';
import { GestionarPacientesDComponent } from './componentes/gestionar-pacientes-d/gestionar-pacientes-d.component';
import { AdministrarPersonalDComponent } from './componentes/administrar-personal-d/administrar-personal-d.component';
import { TratamientosGestionDComponent } from './componentes/tratamientos-gestion-d/tratamientos-gestion-d.component';
import { AltaPacienteRComponent } from './componentes/alta-paciente-r/alta-paciente-r.component';
import { CobrosEingresosRComponent } from './componentes/cobros-eingresos-r/cobros-eingresos-r.component';
import { PacientesMainComponentComponent } from './componentes/pacientes-main-component/pacientes-main-component.component';
import { CitaMainRComponent } from './componentes/cita-main-r/cita-main-r.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path: 'menu-dentista',component: MenuDentistaComponent},
    {path: 'menu-ayudante',component: MenuAyudanteComponent},
    {path: 'menu-recepcionista',component: MenuRecepcionistaComponent},
    {path: 'gestion-pacientes',component: GestionarPacientesDComponent},
    {path: 'tratamientos',component: TratamientosDComponent},
    {path: 'gestion-materiales',component: InventarioDComponent},
    {path:'admin-personal',component:AdministrarPersonalDComponent},
    {path:'tratamientos-gestion',component:TratamientosGestionDComponent},
    {path:'alta-pacientes',component:PacientesMainComponentComponent},
    {path:'cobros-ingresos',component:CobrosEingresosRComponent},
    {path:'citas-pacientes-agendar',component:CitaMainRComponent}
    ];
