import { Component } from '@angular/core';

@Component({
  selector: 'app-tratamientos-d',
  imports: [],
  templateUrl: './tratamientos-d.component.html',
  styleUrl: './tratamientos-d.component.css'
})
export class TratamientosDComponent {
  //SE RECIBE AL USER:
  usuario: any;

  ngOnInit() {
    this.usuario = history.state['usuario'];
    console.log("Usuario recibido:", this.usuario);
  }

}
