import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../services/authservice.service';
import { CitasService } from '../../services/citas.service';

@Component({
  standalone:true,
  selector: 'app-citas-cobro-r',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './citas-cobro-r.component.html',
  styleUrl: './citas-cobro-r.component.css'
})
export class CitasCobroRComponent implements OnInit {
   // Datos
  listaPendientes: any[] = [];
  listaMetodos: any[] = [];
  
  // Variables de control
  terminoBusqueda: string = '';
  citaSeleccionada: any = null;
  nombreRecepcionista: string = '';

  // Formulario
  formCobro: FormGroup;

   constructor(
    private citasService: CitasService,
    private authService: AuthserviceService,
    private fb: FormBuilder
  ) {
    this.formCobro = this.fb.group({
      monto_a_pagar: [0, [Validators.required, Validators.min(1)]],
      id_metodo_pago: ['', Validators.required]
    });
  }

   ngOnInit(): void {
    // 1. Obtener usuario actual (Recepcionista)
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.nombreRecepcionista = `${usuario.nombres} ${usuario.apellidopat}`;
    }

    // 2. Cargar métodos de pago (Efectivo, Tarjeta, etc.)
    this.cargarMetodosPago();

    // 3. Cargar lista inicial (opcional, o esperar a que busquen)
    this.buscarDeudas();
  }

  cargarMetodosPago() {
    this.citasService.getMetodosPago().subscribe({
      next: (data) => this.listaMetodos = data,
      error: (e) => console.error('Error al cargar métodos de pago', e)
    });
  }

  buscarDeudas() {
    // El backend ya filtra por estado='Atendida' y saldo > 0
    this.citasService.buscarPendientesCobro(this.terminoBusqueda).subscribe({
      next: (data) => {
        this.listaPendientes = data;
        this.citaSeleccionada = null; // Limpiar selección al buscar de nuevo
        this.formCobro.reset();
      },
      error: (e) => console.error('Error buscando deudas:', e)
    });
  }

  seleccionarCita(cita: any) {
    this.citaSeleccionada = cita;
    
    // Configurar el formulario con valores por defecto
    // Por defecto sugerimos pagar todo el saldo pendiente
    this.formCobro.patchValue({
      monto_a_pagar: cita.saldo_pendiente,
      id_metodo_pago: '' // Obligar a seleccionar
    });

    // Agregar validación dinámica: No pagar más de lo que se debe
    this.formCobro.controls['monto_a_pagar'].setValidators([
      Validators.required, 
      Validators.min(1), 
      Validators.max(cita.saldo_pendiente)
    ]);
    this.formCobro.controls['monto_a_pagar'].updateValueAndValidity();
  }

  procesarPago() {
    if (this.formCobro.invalid || !this.citaSeleccionada) return;

    if (!confirm(`¿Confirmar pago de $${this.formCobro.value.monto_a_pagar} para el paciente ${this.citaSeleccionada.nombre_paciente}?`)) {
      return;
    }

    const datosPago = {
      id_cita: this.citaSeleccionada.id_cita,
      monto_a_pagar: this.formCobro.value.monto_a_pagar,
      id_metodo_pago: this.formCobro.value.id_metodo_pago
    };

    this.citasService.realizarCobro(datosPago).subscribe({
      next: (res) => {
        alert('Pago registrado exitosamente');
        this.buscarDeudas(); // Recargar la lista para ver que el saldo bajó o desapareció
      },
      error: (err) => {
        console.error(err);
        alert('Error al cobrar: ' + (err.error.error || 'Intente de nuevo'));
      }
    });
  }



}
