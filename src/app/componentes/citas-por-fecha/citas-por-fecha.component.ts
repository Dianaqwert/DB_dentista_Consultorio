import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../interfaces/Cita';


@Component({
  standalone:true,
  selector: 'app-citas-por-fecha',
  imports: [CommonModule,FormsModule],
  templateUrl: './citas-por-fecha.component.html',
  styleUrl: './citas-por-fecha.component.css'
})
export class CitasPorFechaComponent {

  fechaSeleccionada: string = '';
  citas: Cita[] = [];

  constructor(private citasService: CitasService) {}

  buscarCitas() {
    if (!this.fechaSeleccionada) return;

    this.citasService.getCitasLISTA(this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.citas = data;
      },
      error: (err) => console.error('Error al cargar citas:', err)
    });
  }

}
