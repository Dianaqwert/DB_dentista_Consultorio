import { Component, Input ,SimpleChanges} from '@angular/core';
import { TratamientoPacienteDComponent } from "../tratamiento-paciente-d/tratamiento-paciente-d.component";
import { DerivacionesExtPacienteDComponent } from "../derivaciones-ext-paciente-d/derivaciones-ext-paciente-d.component";
import { HistorialPacientesDComponent } from "../historial-pacientes-d/historial-pacientes-d.component";
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-tratamientos-d',
  imports: [CommonModule,TratamientoPacienteDComponent,DerivacionesExtPacienteDComponent, HistorialPacientesDComponent],
  templateUrl: './tratamientos-d.component.html',
  styleUrl: './tratamientos-d.component.css'
})
export class TratamientosDComponent {
  //SE RECIBE AL USER:
  usuario: any;
  @Input() pacienteSeleccionadoId: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pacienteSeleccionadoId']) {
      console.log("🔄 Cambió el paciente seleccionado:", this.pacienteSeleccionadoId);
    }
  }

  ngOnInit() {
    this.usuario = history.state['usuario'];
    console.log("Usuario recibido:", this.usuario);

  }

}
