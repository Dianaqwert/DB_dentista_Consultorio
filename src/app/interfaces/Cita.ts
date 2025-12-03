// Esta es la estructura básica que devuelve tu consulta "getCitasFiltro"
export interface Cita {
    id_cita: number;
    fecha_hora: string;  // Viene del backend (YYYY-MM-DD)
    hora: string;        // Viene del backend (HH:MM:SS)
    estado_cita: 'Agendada' | 'Confirmada' | 'Cancelada' | 'Pendiente' | 'Reprogramada' | 'Atendida' | 'No asistio';
    descripcion: string;
    
    // CAMPOS EXTRA QUE TU SQL AGREGA (JOIN con Paciente)
    nombre_paciente: string; 
    telefono: string;
    id_dentista:number;
    // Opcionales (pueden no venir en todas las consultas)
    id_paciente?: number; 
}

// Para el apartado de Cobranza (tu consulta "buscarCitasParaCobro" devuelve cosas distintas)
export interface CitaCobro {
    id_cita: number;
    fecha_hora: string;
    nombre_paciente: string;
    monto_total: number;
    monto_pagado: number;
    saldo_pendiente: number;
    estado_deuda: string;
}