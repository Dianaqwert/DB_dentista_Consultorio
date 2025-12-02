export interface Paciente {
  id_paciente: number;
  nombrespaciente: string;
  apellidopat: string;
  apellidomat: string;
  telefono: string;
  email: string;
}

/*
CREATE TABLE Paciente (
    id_paciente SERIAL PRIMARY KEY,
    nombresPaciente VARCHAR(100) NOT NULL,
    apellidoPat VARCHAR(100) NOT NULL,
    apellidoMat VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
	fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255) NOT NULL UNIQUE
);*/