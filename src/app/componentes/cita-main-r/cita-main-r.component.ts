import { Component } from '@angular/core';
import { CitasGestionarRComponent } from "../citas-gestionar-r/citas-gestionar-r.component";
import { CitasGenerarComponent } from "../citas-generar/citas-generar.component";
import { CitasPorFechaComponent } from "../citas-por-fecha/citas-por-fecha.component";
import { CitasCobroRComponent } from "../citas-cobro-r/citas-cobro-r.component";

//tipo personalizadp
type VistaCitas = 'agenda' | 'nueva' | 'cobrar';

@Component({
  standalone:true,
  selector: 'app-cita-main-r',
  imports: [CitasGestionarRComponent, CitasGenerarComponent, CitasPorFechaComponent, CitasCobroRComponent],
  templateUrl: './cita-main-r.component.html',
  styleUrl: './cita-main-r.component.css'
})
export class CitaMainRComponent {
  vistaActual: VistaCitas = 'agenda';
  constructor() {}

}
