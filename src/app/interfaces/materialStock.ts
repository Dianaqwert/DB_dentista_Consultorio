export interface materialStock {
    id_material?: number;
    nombre: string;
    costounitario: number;
    stock: number;
    cantidad: number;
    id_tipo_material: number;
    id_empleado_creador?: number;
}
