import { Component, Input, SimpleChanges } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tratamiento-paciente-d',
  imports: [CommonModule],
  templateUrl: './tratamiento-paciente-d.component.html',
  styleUrl: './tratamiento-paciente-d.component.css'
})
export class TratamientoPacienteDComponent {
  @Input() idPaciente: number | null = null; 
  tratamientos: any[] = [];
  
  constructor(private pacientesService: PacientesService) { }

  ngOnInit(): void {
    // 1. Carga inicial (mostrar todos al inicio si idPaciente es null)
    this.cargarTratamientos(this.idPaciente);
  }

  // 2. Detecta cambios en el ID del paciente (ej: cuando se busca)
  ngOnChanges(changes: SimpleChanges): void {
    // Simplemente verifica si la propiedad cambió, sin importar si es la primera vez
    if (changes['idPaciente']) {
      this.cargarTratamientos(this.idPaciente)
    }
  }

  cargarTratamientos(id: number | null) {
    this.pacientesService.getTratamientos(id).subscribe({
      next: (data) => {
        this.tratamientos = data;
        console.log("Tratamiento cargado:", data); 
      },
      error: (err) => {
        console.error('Error cargando tratamiento:', err);
        this.tratamientos = [];
      }
    });
  }






}