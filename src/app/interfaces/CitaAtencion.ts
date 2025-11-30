export interface CitaAtencion {
  id_cita: number;
  id_paciente: number;
  paciente_nombre_completo: string;
  fecha_hora: string;
  motivo_principal_cita: string;
  estado_cita: string;
}
