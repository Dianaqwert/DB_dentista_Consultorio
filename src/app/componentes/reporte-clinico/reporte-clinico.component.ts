import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteReporte } from '../../interfaces/PacienteReporte';
import { CitaFiltrada } from '../../interfaces/CitaFiltrada';
import { CitaAtencion } from '../../interfaces/CitaAtencion';
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { Paciente } from '../../interfaces/Paciente';
import { EmpleadosService } from '../../services/empleados.service';
import { PacientesService } from '../../services/pacientes.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-reporte-clinico',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './reporte-clinico.component.html',
  styleUrl: './reporte-clinico.component.css'
})
export class ReporteClinicoComponent {

  @Input() dentista!: Usuario;
  @Input() usuario!: Usuario;
  @Output() seleccionarPaciente = new EventEmitter<any>();
  @Input() pacientes: PacienteReporte[] = [];
  @Input() pacientesFC: any[] = [];


  citas: CitaFiltrada[] = [];
  citasFiltradas: CitaFiltrada[] = [];
  usuarioLogueado!: Usuario | null;

  pacienteSeleccionado!: PacienteReporte | null;
  citaParaAtender: CitaAtencion | null = null;

  agenda: CitaFiltrada[] = [];

  fechaFiltro: string = '';
  estadoFiltro: string = '';

  estadosPosibles = ['Agendada','Confirmada','Pendiente','Cancelada','Atendida','Todos'];

  // Emite un evento al padre cuando se hace clic en "Volver"
  @Output() volverMenu = new EventEmitter<void>();


  //empleado
  nombreDentista:string='';
  vistaActiva: 'lista' | 'detalle' = 'lista'; 
  pacienteSeleccionadoId: number | null = null;
  searchForm:FormGroup;
  //para controldar la cita

  constructor(
  private fb: FormBuilder,
  private usuarioService: PacientesService,
  private empleadoService: EmpleadosService
) {

  this.searchForm = this.fb.group({
    nombres: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    apellidoPat: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
    apellidoMat: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
  });

}

ngOnInit() {
  this.cargarTodosLosPacientes();
}



  onSearch() {
    //validacion
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    //objeto que obtiene los valores
    let { 
      nombres, 
      apellidoPat, 
      apellidoMat,
    } = this.searchForm.value;

    // Convertir a minúsculas
    nombres = nombres?.toLowerCase() || '';
    apellidoPat = apellidoPat?.toLowerCase() || '';
    apellidoMat = apellidoMat?.toLowerCase() || '';

    console.log('Buscado por:', nombres, apellidoPat, apellidoMat);
    //se manda a llamar al servicio
    this.buscarPacientes(nombres, apellidoPat, apellidoMat);
  }

   resetBusqueda() {
    // 1. Limpiar los valores del formulario
    this.searchForm.reset({
      nombres: '',
      apellidoPat: '',
      apellidoMat: ''
    });

    // 2. Limpiar la selección de la tabla (esto resetea las pestañas de abajo)
    this.pacienteSeleccionadoId = null; 
    this.pacienteSeleccionado = null;

    // 3. Recargar la tabla principal con todos los datos
    this.cargarTodosLosPacientes();
  }

  cargarTodosLosPacientes() {
    // Llamamos al servicio con cadenas vacías para traer todo
    this.buscarPacientes('', '', '');
  }

  volverAlMenu() {
    this.volverMenu.emit();
  }

  seleccionarPacienteFila(paciente: any) {
    this.pacienteSeleccionadoId = paciente.id_paciente;
    this.pacienteSeleccionado = paciente;

    this.seleccionarPaciente.emit(paciente);
  }


  buscarPacientes(nombres: string, apellidoPat: string, apellidoMat: string) {
        // En lugar de llamar a getReporteCompleto(), usamos la ruta /buscar que ya modificamos
        // para que devuelva la vista de reporte.
        this.usuarioService.buscarPacientes(nombres, apellidoPat, apellidoMat).subscribe({
            next: (data) => {
                //los resultados son filas de la vista_reporte_cita_completa
                this.pacientes = [...data]; 

                /*if (data.length > 0) {
                  this.pacienteSeleccionadoId = data[0].id_paciente;
                } else {
                  this.pacienteSeleccionadoId = null;
                }*/
               this.pacienteSeleccionadoId = null;

            },
            error: (err) => {
                console.error('Error buscando reportes:', err);
                this.pacientes = []; // Vacía la tabla si hay error o no hay resultados
                alert('No se encontraron pacientes con esos datos.');
            }
        });
    }

}
