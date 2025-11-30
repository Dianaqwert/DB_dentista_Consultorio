export interface CitaFiltrada {
  id_cita: number;
  fecha_hora: string;
  hora: string;
  motivo_principal_cita: string;
  estado_cita: string;
  id_paciente: number;
  dentistas_involucrados: string;
  paciente_nombre_completo: string;
}
