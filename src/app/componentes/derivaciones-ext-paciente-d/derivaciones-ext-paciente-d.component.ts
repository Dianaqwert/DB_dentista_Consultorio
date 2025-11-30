import { Component, Input } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-derivaciones-ext-paciente-d',
  imports: [CommonModule],
  templateUrl: './derivaciones-ext-paciente-d.component.html',
  styleUrl: './derivaciones-ext-paciente-d.component.css'
})
export class DerivacionesExtPacienteDComponent implements OnInit, OnChanges {
  // Recibe el ID del paciente (puede ser null al inicio)
  @Input() idPaciente: number | null = null; 
  derivaciones: any[] = [];
  
  constructor(private pacientesService: PacientesService) { }

  ngOnInit(): void {
    // 1. Carga inicial (mostrar todos al inicio si idPaciente es null)
    this.cargarDerivaciones(this.idPaciente);

  }

  // 2. Detecta cambios en el ID del paciente (ej: cuando se busca)
  ngOnChanges(changes: SimpleChanges): void {
    // Simplemente verifica si la propiedad cambió, sin importar si es la primera vez
    if (changes['idPaciente']) {
      this.cargarDerivaciones(this.idPaciente)
    }
  }

  cargarDerivaciones(id: number | null) {
    this.pacientesService.getDerivaciones(id).subscribe({
      next: (data) => {
        this.derivaciones = data;
        console.log("Derivaciones cargadas:", data.length); // Para depurar
      },
      error: (err) => {
        console.error('Error cargando derivaciones:', err);
        this.derivaciones = [];
      }
    });
  }


}