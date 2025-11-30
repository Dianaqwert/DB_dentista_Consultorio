import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { EmpleadosService } from '../../services/empleados.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteReporte } from '../../interfaces/PacienteReporte';
import { CitaFiltrada } from '../../interfaces/CitaFiltrada';
import { CitaAtencion } from '../../interfaces/CitaAtencion';
import { Usuario } from '../../interfaces/usuarioEmpleado';
import { Paciente } from '../../interfaces/Paciente';
import { AtencionCitaComponent } from "../atencion-cita/atencion-cita.component";

declare var bootstrap: any;

@Component({
  standalone:true,
  selector: 'app-agenda-citas',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './agenda-citas.component.html',
  styleUrl: './agenda-citas.component.css'
})
export class AgendaCitasComponent {
 
  @Input() dentista!: Usuario;
  @Input() pacientes: Paciente[] = [];
  @Input() usuario!: Usuario;

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



  ngOnInit(): void {
    //obtener usuario logeado
    this.usuarioLogueado=this.empleadoService.getUsuario();
    console.log("Usuario Logueado:", this.usuarioLogueado); // Debug
    //nombre del dentista
    if (this.usuarioLogueado && this.usuarioLogueado.tipoempleado === 'Dentista') {
      this.nombreDentista = this.usuarioLogueado.nombres 
    }

    // Carga todos los pacientes al iniciar, pasando valores vacíos
    this.buscarPacientes('', '', '');

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


  filtrar() {
    this.citasFiltradas = this.citas.filter(c => {
      return (!this.fechaFiltro || c.fecha_hora === this.fechaFiltro)
         && (!this.estadoFiltro || c.estado_cita === this.estadoFiltro);
    });
  }

  limpiar() {
    this.fechaFiltro = '';
    this.estadoFiltro = '';
    this.citasFiltradas = [...this.citas];
  }

  
  //_____________________________________________LOS QUE YA TENIA :
  buscarCitasPorFecha() {
    //verificamos si es dentista 
    let idDentistaParaFiltro: number | undefined = undefined;

    if (this.usuarioLogueado && this.usuarioLogueado.tipoempleado === 'Dentista') {
        idDentistaParaFiltro = this.usuarioLogueado.id_usuario;
    }

    console.log("Filtrando agenda para dentista ID:", idDentistaParaFiltro); // Debug

    // Llamamos al servicio con el ID del dentista
    this.usuarioService.getCitasPorFecha(this.fechaFiltro, this.estadoFiltro, idDentistaParaFiltro)
      .subscribe({
        next: (data) => {
          this.citasFiltradas = data;
        },
        error: (err) => console.error('Error cargando agenda', err)
      });
  }

    limpiarFiltroFecha() {
      this.citasFiltradas = [];
      this.fechaFiltro = '';
      this.estadoFiltro = 'Todos';
  }

   //leer el modal
  abrirModalAtencion(citaReporte: any) {
    // Mapeamos los datos de la vista al formato que espera el modal
      this.citaParaAtender = {
      id_cita: citaReporte.id_cita,
      id_paciente: citaReporte.id_paciente,
      paciente_nombre_completo: citaReporte.paciente_nombre_completo,
      fecha_hora: citaReporte.fecha_hora,
      motivo_principal_cita: citaReporte.motivo_principal_cita,
      estado_cita: citaReporte.estado_cita
    };

    // Abrir modal de Bootstrap
    const modalElement = document.getElementById('modalAtencion');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

    //metodo para guardar los datos de atención
  recargarDatos() {
    // Recargamos la búsqueda actual para ver el cambio de estado a "Atendida"
    const { nombres, apellidoPat, apellidoMat } = this.searchForm.value;
    this.buscarPacientes(nombres, apellidoPat, apellidoMat);
  }


  buscarPacientes(nombres: string, apellidoPat: string, apellidoMat: string) {
        // En lugar de llamar a getReporteCompleto(), usamos la ruta /buscar que ya modificamos
        // para que devuelva la vista de reporte.
        this.usuarioService.buscarPacientes(nombres, apellidoPat, apellidoMat).subscribe({
            next: (data) => {
                //los resultados son filas de la vista_reporte_cita_completa
                this.pacientes = data; 

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

