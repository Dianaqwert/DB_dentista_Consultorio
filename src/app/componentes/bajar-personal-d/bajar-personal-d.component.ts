import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Usuario } from '../../interfaces/usuarioEmpleado';

@Component({
  standalone:true,
  selector: 'app-bajar-personal-d',
  imports: [CommonModule,FormsModule],
  templateUrl: './bajar-personal-d.component.html',
  styleUrl: './bajar-personal-d.component.css'
})
export class BajarPersonalDComponent implements OnInit {

  listaEmpleados: Usuario[] = [];
  busqNombre: string = '';
  busqPaterno: string = '';
  busqMaterno: string = '';
  filtroTipo: string = 'Todos';
  terminoBusqueda: string = '';
  listaCompleta: Usuario[] = [];

  constructor(private empleadoService: EmpleadosService) {}

  ngOnInit(): void {
    this.cargarTodos();
  }

  // 1. Cargar usando la VISTA
  cargarTodos() {
    this.empleadoService.getEmpleadosActivos().subscribe({
      next: (data) => {
        this.listaCompleta = data; // Guardamos la copia original
        this.listaEmpleados = data; // Mostramos todo al inicio
      },
      error: (e) => console.error(e)
    });
  }
  filtrarLocalmente() {
    const nombre = this.busqNombre.toLowerCase();
    const pat = this.busqPaterno.toLowerCase();
    const mat = this.busqMaterno.toLowerCase();

    this.listaEmpleados = this.listaCompleta.filter(emp => {
      // Validamos que los campos existan (por si vienen null)
      const n = emp.nombres?.toLowerCase() || '';
      const p = emp.apellidoPat?.toLowerCase() || '';
      const m = emp.apellidoMat?.toLowerCase() || '';

      // Debe coincidir con TODO lo que el usuario haya escrito
      return n.includes(nombre) && p.includes(pat) && m.includes(mat);
    });
  }

  // 2. Filtrar usando la FUNCIÓN SQL
  cambiarFiltro() {
    if (this.filtroTipo === 'Todos') {
      this.cargarTodos();
    } else {
      this.empleadoService.filtrarPorTipo(this.filtroTipo).subscribe({
        next: (data) => {
            this.listaCompleta = data;
            this.listaEmpleados = data;
            // Limpiamos los inputs de texto al cambiar de rol para no confundir
            this.busqNombre = '';
            this.busqPaterno = '';
            this.busqMaterno = '';
        },
        error: (e) => console.error(e)
      });
    }
  }

  // 3. Buscar por Nombre
  buscar() {
    if (this.terminoBusqueda.trim() === '') {
      this.cargarTodos(); // Si borra el texto, carga todo
      return;
    }
    this.empleadoService.buscarPorNombre(this.terminoBusqueda).subscribe({
      next: (data) => this.listaEmpleados = data,
      error: (e) => console.error(e)
    });
  }

  // 4. Eliminar Usuario
  eliminar(id: number, nombre: string) {
    if(confirm(`¿Estás seguro de que deseas eliminar a ${nombre}? Esta acción no se puede deshacer.`)) {
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: () => {
          alert('Empleado eliminado');
          this.cargarTodos(); // Recargar la tabla
        },
        error: (err) => {
          alert('Error al eliminar. Puede que tenga citas asignadas.');
          console.error(err);
        }
      });
    }
  }
}