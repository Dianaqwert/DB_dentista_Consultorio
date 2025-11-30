export interface PacienteReporte {
  id_paciente: number;
  id_cita: number;
  paciente_nombre_completo: string;
  fecha_hora: string;
  motivo_principal_cita: string;
  estado_cita: string;
}
