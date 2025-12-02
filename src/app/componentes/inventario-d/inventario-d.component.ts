import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { FormsModule } from '@angular/forms';
import { CategoriaAgrupada } from '../../interfaces/inventarioGen';

@Component({
  selector: 'app-inventario-d',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './inventario-d.component.html',
  styleUrl: './inventario-d.component.css'
})
export class InventarioDComponent implements OnInit{

  //SE RECIBE AL USER:
  usuario: any;
  listaBajoStock: any[] = [];
  listaAltoValor: any[] = [];
  inventarioGeneral: CategoriaAgrupada[] = [];  
  
  inputLimiteStock: number = 10;   // Valor por defecto
  inputMontoMinimo: number = 500;  // Valor por defecto

  constructor(private inventarioService: InventarioService) {}


  ngOnInit() {
    this.usuario = history.state['usuario'];
    console.log("Usuario recibido:", this.usuario);
    this.cargarInventarioGeneral();
    this.filtrarBajoStock();
    this.filtrarAltoValor();    
  }

  // 1. Cargar Vista General
  cargarInventarioGeneral() {
    this.inventarioService.getInventarioGeneral().subscribe({
      next: (data) => this.inventarioGeneral = data,
      error: (e) => console.error(e)
    });
  }

  // 2. Ejecutar fn_reporte_bajo_stock con el input del usuario
  filtrarBajoStock() {
    this.inventarioService.getBajoStock(this.inputLimiteStock).subscribe({
      next: (data) => this.listaBajoStock = data,
      error: (e) => console.error(e)
    });
  }

  // 3. Ejecutar fn_categorias_alto_valor con el input del usuario
  filtrarAltoValor() {
    this.inventarioService.getAltoValor(this.inputMontoMinimo).subscribe({
      next: (data) => this.listaAltoValor = data,
      error: (e) => console.error(e)
    });
  }


}
