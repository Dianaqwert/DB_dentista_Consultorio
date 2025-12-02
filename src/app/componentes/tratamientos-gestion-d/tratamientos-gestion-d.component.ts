import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TratamientoNuevo } from '../../interfaces/nuevoTratamiento';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TratamientosService } from '../../services/tratamientos.service';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacientesTratamientosInactivosDComponent } from "../pacientes-tratamientos-inactivos-d/pacientes-tratamientos-inactivos-d.component";
import { EstadisticasTratamientosDComponent } from "../estadisticas-tratamientos-d/estadisticas-tratamientos-d.component";

@Component({
  standalone:true,
  selector: 'app-tratamientos-gestion-d',
  imports: [CommonModule, ReactiveFormsModule, PacientesTratamientosInactivosDComponent, EstadisticasTratamientosDComponent],
  templateUrl: './tratamientos-gestion-d.component.html',
  styleUrl: './tratamientos-gestion-d.component.css'
})
export class TratamientosGestionDComponent implements OnInit{
  soloLetras = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;
  soloNumeros = /^[0-9]+$/;

  searchForm:FormGroup;
  //objeto
  nuevoTratamiento: TratamientoNuevo = {
    nombre: '',
    descripcion: '',
    costo: 0
  };
  // Lista para mostrar en la tabla (si la tienes abajo)
  listaTratamientos: TratamientoNuevo[] = [];
  listaInactivos: TratamientoNuevo[] = [];

  // Inyectamos el servicio en el constructor
  constructor(private tratamientoService: TratamientosService,private fb:FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,                 // campo obligatorio
          Validators.pattern(this.soloLetras), // solo letras y espacios
          Validators.maxLength(255)            // máximo 255 caracteres
        ]
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.pattern(this.soloLetras),
          Validators.maxLength(255)
        ]
      ],
      costo: [
        '',
        [
          Validators.required,              // obligatorio
          Validators.min(0),                // mínimo 0
          Validators.max(99999999),         // máximo 8 dígitos
          Validators.pattern(this.soloNumeros),   // solo números enteros
          Validators.maxLength(8)           // máximo 8 caracteres
        ]
      ]
    });
  }

  ngOnInit(): void {
      //carga los tratamientos existentes
      this.cargarTratamientos()
  }

  cargarTratamientos() {
    this.tratamientoService.getTratamientos().subscribe({
      next: (data) =>this.listaTratamientos = data,
      error: (err) => console.error('Error al cargar', err)
    });

    // 2. Cargar Inactivos (Archivados)
    this.tratamientoService.getTratamientosInactivos().subscribe({
        next: (data) => {
          console.log('Inactivos:', data); // Para depurar
          this.listaInactivos = data;
        },
        error: (e) => console.error('Error al cargar inactivos', e)
    });

    
  }

  obtenerTratamientos() {
    this.tratamientoService.getTratamientos().subscribe({
      next: (datos) => {
        this.listaTratamientos = datos;
      },
      error: (e) => console.error(e)
    });
  }

  // Función lógica para los botones de + y - del precio
  ajustarCosto(valor: number) {
    const nuevoCosto = this.nuevoTratamiento.costo + valor;
    if (nuevoCosto >= 0) {
      this.nuevoTratamiento.costo = nuevoCosto;
    }
  }

  // Función para GUARDAR (POST) usando el Servicio
  guardarTratamiento() {
    // Validaciones básicas
    if (!this.nuevoTratamiento.nombre || this.nuevoTratamiento.costo <= 0) {
      alert('Completa los campos correctamente');
      return;
    }

    // Usamos el servicio
    this.tratamientoService.crearTratamiento(this.nuevoTratamiento).subscribe({
      next: (res) => {
        console.log('Respuesta del server:', res);
        alert('Tratamiento agregado con éxito');
        
        // 1. Limpiamos el formulario
        this.nuevoTratamiento = { nombre: '', descripcion: '', costo: 0 };
        
        // 2. Recargamos la lista para ver el nuevo registro inmediatamente
        this.obtenerTratamientos();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        alert('Hubo un error al guardar el tratamiento');
      }
    });
  }

  eliminar(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar este tratamiento?')) {
      this.tratamientoService.eliminarTratamiento(id).subscribe({
        next: () => {
          alert('Procesado (Eliminado o Archivado)');
          this.cargarTratamientos();
        },
        error: (err) => alert('Error al eliminar')
      });
    }
  }

  
}
