import { Component } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citas-cobrar-r',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './citas-cobrar-r.component.html',
  styleUrl: './citas-cobrar-r.component.css'
})
export class CitasCobrarRComponent {
  terminoBusqueda: string = '';
  citasPendientes: any[] = [];
  metodosPago: any[] = [];
  citaSeleccionada: any = null;
  
  montoPagar: number = 0;
  metodoSeleccionado: number = 1; // ID 1 suele ser Efectivo por defecto

  constructor(private citasService: CitasService) {}

  // Usamos ngOnInit para la carga inicial en lugar del constructor
  ngOnInit(): void {
      this.cargarMetodos();
  }

  // ESTA ES LA FUNCIÓN QUE TE FALTABA
  cargarMetodos() {
    this.citasService.getMetodosPago().subscribe({
      next: (data) => {
        this.metodosPago = data;
      },
      error: (err) => console.error('Error cargando métodos de pago', err)
    });
  }

  buscar() {
    // Evitar búsquedas vacías si quieres, o permitir traer todo
    this.citasService.buscarPendientesCobro(this.terminoBusqueda).subscribe({
        next: (res) => {
            this.citasPendientes = res;
            this.citaSeleccionada = null; // Limpiamos selección anterior al buscar de nuevo
        },
        error: (e) => console.error(e)
    });
  }

  seleccionarCita(cita: any) {
      this.citaSeleccionada = cita;
      // Por defecto sugerimos que pague todo lo que debe
      this.montoPagar = cita.saldo_pendiente; 
  }

  procesarCobro() {
      if (!this.citaSeleccionada) return;

      if(this.montoPagar <= 0 || this.montoPagar > this.citaSeleccionada.saldo_pendiente) {
          alert("Monto inválido: Debe ser mayor a 0 y no exceder la deuda."); 
          return;
      }

      const payload = {
          id_cita: this.citaSeleccionada.id_cita,
          monto_a_pagar: this.montoPagar,
          id_metodo_pago: this.metodoSeleccionado
      };

      this.citasService.realizarCobro(payload).subscribe({
          next: () => {
              alert("Pago registrado con éxito");
              // Recargamos la lista para que desaparezca la deuda o se actualice
              this.buscar(); 
              this.citaSeleccionada = null;
          },
          error: (e) => {
            console.error(e);
            // Mostramos el mensaje exacto que manda el backend (o el trigger)
            alert('Error: ' + (e.error.error || 'No se pudo procesar el cobro'));
          }
      });
  }
}