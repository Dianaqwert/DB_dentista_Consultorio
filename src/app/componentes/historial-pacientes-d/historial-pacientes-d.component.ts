import { CommonModule } from '@angular/common';
import { Component,SimpleChanges,Input} from '@angular/core';
import { PacientesService} from '../../services/pacientes.service';

@Component({
  standalone:true,
  selector: 'app-historial-pacientes-d',
  imports: [CommonModule,],
  templateUrl: './historial-pacientes-d.component.html',
  styleUrl: './historial-pacientes-d.component.css'
})
export class HistorialPacientesDComponent {
  // Recibe el ID del paciente (puede ser null al inicio)
  @Input() idPaciente: number | null = null; 
  historial: any[] = [];
  
  constructor(private pacientesService: PacientesService) { }

  ngOnInit(): void {
    // 1. Carga inicial (mostrar todos al inicio si idPaciente es null)
    this.cargarHistorial(this.idPaciente);
  }

  // 2. Detecta cambios en el ID del paciente (ej: cuando se busca)
  ngOnChanges(changes: SimpleChanges): void {
    // Simplemente verifica si la propiedad cambió, sin importar si es la primera vez
    if (changes['idPaciente']) {
      this.cargarHistorial(this.idPaciente)
    }
  }

  cargarHistorial(id: number | null) {
    this.pacientesService.getHistorial(id).subscribe({
      next: (data) => {
        this.historial = data;
        console.log("Historial cargado:", data); 
      },
      error: (err) => {
        console.error('Error cargando historial:', err);
        this.historial = [];
      }
    });
  }




}
