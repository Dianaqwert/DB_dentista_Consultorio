import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario-d',
  imports: [],
  templateUrl: './inventario-d.component.html',
  styleUrl: './inventario-d.component.css'
})
export class InventarioDComponent {

  //SE RECIBE AL USER:
  usuario: any;

  ngOnInit() {
    this.usuario = history.state['usuario'];
    console.log("Usuario recibido:", this.usuario);
  }

}
