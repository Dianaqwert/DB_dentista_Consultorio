import { Component,OnInit } from '@angular/core';
import { ReportesServiceService } from '../../services/reportes-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-reporte-ganancias-r',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './reporte-ganancias-r.component.html',
  styleUrl: './reporte-ganancias-r.component.css'
})
export class ReporteGananciasRComponent implements OnInit {

  fechaInicio: string = '';
  fechaFin: string = '';
  
  datosIngresos: any[] = []; // Lista SIN el total general
  datosDeudores: any[] = [];
  
  // Totales
  totalGeneral: number = 0;
  totalIVA: number = 0;
  totalNeto: number = 0;
  totalDeudaPeriodo: number = 0;

  constructor(private reportesService: ReportesServiceService) {}

  ngOnInit(): void {
    const hoy = new Date();
    const primeroMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    
    this.fechaFin = hoy.toISOString().split('T')[0];
    this.fechaInicio = primeroMes.toISOString().split('T')[0];
    
    this.generarReporte();
  }

  generarReporte() {
    this.cargarIngresos();
    this.cargarDeudores();
  }

  cargarIngresos() {
    this.reportesService.getIngresos(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        // 1. Buscamos la fila que representa el TOTAL GENERAL
        const filaTotal = data.find(d => d.metodo_pago === 'TOTAL GENERAL' && d.tratamiento === 'SUBTOTAL PAGO');
        
        if (filaTotal) {
            this.totalGeneral = Number(filaTotal.ingresos_totales);
        } else {
            this.totalGeneral = 0;
        }

        // 2. SEPARAMOS LOS DATOS:
        // Guardamos en la lista todo lo que NO sea el 'TOTAL GENERAL' para la tabla normal
        this.datosIngresos = data.filter(d => !(d.metodo_pago === 'TOTAL GENERAL' && d.tratamiento === 'SUBTOTAL PAGO'));

        // Cálculos
        this.totalIVA = this.totalGeneral * 0.16;
        this.totalNeto = this.totalGeneral;
      },
      error: (err) => console.error('Error ingresos', err)
    });
  }

  cargarDeudores() {
    this.reportesService.getDeudores(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.datosDeudores = data;
        this.totalDeudaPeriodo = data.reduce((acc, curr) => acc + Number(curr.total_deuda), 0);
      },
      error: (err) => console.error('Error deudores', err)
    });
  }
  
  esFilaSubtotal(item: any): boolean {
      return item.tratamiento === 'SUBTOTAL PAGO';
  }
}