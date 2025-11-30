import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuAyudanteComponent } from './componentes/menu-ayudante/menu-ayudante.component';
import { MenuDentistaComponent } from './componentes/menu-dentista/menu-dentista.component';
import { MenuRecepcionistaComponent } from './componentes/menu-recepcionista/menu-recepcionista.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MenuAyudanteComponent,MenuDentistaComponent,MenuRecepcionistaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoFinal';
}
