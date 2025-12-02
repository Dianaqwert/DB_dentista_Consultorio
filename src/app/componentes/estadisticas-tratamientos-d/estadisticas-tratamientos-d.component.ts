import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TratamientosService } from '../../services/tratamientos.service';
import { TratamientoNuevo } from '../../interfaces/nuevoTratamiento';

@Component({
  standalone:true,
  selector: 'app-estadisticas-tratamientos-d',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './estadisticas-tratamientos-d.component.html',
  styleUrl: './estadisticas-tratamientos-d.component.css'
})
export class EstadisticasTratamientosDComponent implements OnInit {

  listaTratamientos: TratamientoNuevo[] = [];
  promedioPrecios: number = 0;
  
  filtroBusqueda: string = '';
  
  // Tratamiento que el usuario seleccionó al dar click
  tratamientoSeleccionado: TratamientoNuevo | null = null;
  
  // Porcentaje a aplicar (vinculado al input)
  porcentajeAumento: number = 0;

  constructor(private tratamientoService: TratamientosService){}

  ngOnInit():void{
    this.cargarDatos();
  }

   cargarDatos() {
    // 1. Cargar la lista
    this.tratamientoService.getTratamientos().subscribe({
      next: (data) => this.listaTratamientos = data,
      error: (e) => console.error(e)
    });

    // 2. Cargar el promedio (KPI)
    this.tratamientoService.getPromedio().subscribe({
      next: (res) => this.promedioPrecios = res.promedio,
      error: (e) => console.error(e)
    });
  }

  get listaFiltrada() {
    if (!this.filtroBusqueda.trim()) return this.listaTratamientos;
    
    return this.listaTratamientos.filter(t => 
      t.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  // Al dar click en la lista
  seleccionar(t: TratamientoNuevo) {
    this.tratamientoSeleccionado = t;
    this.porcentajeAumento = 0; // Reseteamos el input
  }

  aplicarAumento() {
    if (!this.tratamientoSeleccionado?.id_tipo_tratamiento) return;
    
    if (this.porcentajeAumento === 0) {
      alert('El porcentaje no puede ser 0');
      return;
    }

    if(confirm(`¿Confirmas aumentar un ${this.porcentajeAumento}% al tratamiento "${this.tratamientoSeleccionado.nombre}"?`)) {
      
      this.tratamientoService.ajustarPrecio(
        this.tratamientoSeleccionado.id_tipo_tratamiento, 
        this.porcentajeAumento
      ).subscribe({
        next: () => {
          alert('Precio actualizado correctamente');
          this.tratamientoSeleccionado = null; // Deseleccionar
          this.cargarDatos(); // Recargar lista y promedio nuevo
        },
        error: () => alert('Error al actualizar')
      });
    }
  }



}
