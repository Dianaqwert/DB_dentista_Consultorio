export interface PacienteReporte {
  id_cita: number;
  id_paciente: number;
  paciente_nombre_completo: string;
  fecha_hora: string;
  motivo_principal_cita: string;
  dentistas_involucrados: string;
  tratamientos_y_cantidad: string;
  historial_avance: string;
  derivaciones_registradas: string;
  estudios_realizados_o_solicitados: string;
}
