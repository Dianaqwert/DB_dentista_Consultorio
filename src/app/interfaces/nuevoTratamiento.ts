export interface TratamientoNuevo {
  id_tipo_tratamiento?: number; // Opcional porque al crear no lo tienes aún
  nombre: string;
  descripcion: string;
  costo: number;
  activo?: boolean; // Opcional, viene de la BD
}