import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TratamientosService } from '../../services/tratamientos.service';

@Component({
  standalone:true,
  selector: 'app-pacientes-tratamientos-inactivos-d',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './pacientes-tratamientos-inactivos-d.component.html',
  styleUrl: './pacientes-tratamientos-inactivos-d.component.css'
})
export class PacientesTratamientosInactivosDComponent implements OnInit{
  
  mostrarReporte: boolean = false;
  listaPacientesInactivos: any[] = [];
  filtroBusqueda: string = '';

  constructor(private tratamientoService: TratamientosService){}

  ngOnInit():void{
     this.tratamientoService.getPacientesConTratamientosInactivos().subscribe({
      next:(data)=>{
        console.log('Pacientes con tratamientos inactivos');
        this.listaPacientesInactivos=data;

        if (this.listaPacientesInactivos.length > 0) {
            this.mostrarReporte = true;
        }
      },
      error:(e)=>console.error('Error al cargar pacientes con tratamientos inactivos')
    })
  }

  get listaFiltrada() {
    // Si no han escrito nada, devolvemos la lista completa
    if (!this.filtroBusqueda.trim()) {
      return this.listaPacientesInactivos;
    }

    // Convertimos a minúsculas para que 'Limpieza' sea igual a 'limpieza'
    const termino = this.filtroBusqueda.toLowerCase();

    return this.listaPacientesInactivos.filter(paciente => {
      // Filtramos por NOMBRE DEL TRATAMIENTO (lo que pediste)
      const coincideTratamiento = paciente.nombre_tratamiento.toLowerCase().includes(termino);
      
      // BONUS: También filtramos por NOMBRE DEL PACIENTE (muy útil)
      const coincidePaciente = paciente.nombre_paciente.toLowerCase().includes(termino);

      return coincideTratamiento || coincidePaciente;
    });
  }

}
