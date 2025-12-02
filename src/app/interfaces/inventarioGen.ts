// 1. Interfaz para el material individual (el desglose)
export interface MaterialDetalle {
    id: number;
    nombre: string;      // En SQL era 'material'
    stock: number;       // En SQL era 'stock_individual'
    costo: number;       // En SQL era 'costo_unitario'
    valor: string | number; // En SQL era 'valor_material_individual'
    comparativa: string; // 'Sobre el Promedio' o 'Bajo el Promedio'
}

// 2. Interfaz para la Categoría (el encabezado del acordeón)
export interface CategoriaAgrupada {
    nombre: string;      // En SQL era 'categoria'
    id_tipo: number;
    kpis: {
        stock_total: string | number;
        valor_total: string | number;
        costo_promedio: string | number;
    };
    materiales: MaterialDetalle[]; // Aquí va la lista de materiales
}