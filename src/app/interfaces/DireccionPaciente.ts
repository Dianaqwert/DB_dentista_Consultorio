/*CREATE TABLE Direccion (
    id_direccion SERIAL PRIMARY KEY,
    CP INTEGER,
    calle VARCHAR(100) NOT NULL,
    colonia VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    numeroInt INTEGER,
    numeroExt INTEGER,
    id_paciente INTEGER UNIQUE, -- Mantiene la relación 1–1
    CONSTRAINT fk_idPaciente FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
);*/

export interface NuevaDireccion {
    cp: number;
    calle: string;
    colonia: string;
    municipio: string;
    numeroInt?: number; // Opcional
    numeroExt?: number; // Opcional
    id_paciente: number; // Indispensable para la relación 1-1
}