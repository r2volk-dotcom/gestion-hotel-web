//export significa que peude usarse en otros archivos

// Interface de Cliente
export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  correo: string;
}

// Interface de Habitacion
export interface Habitacion {
  id?: number;
  tipo: string;
  precio: number;
  disponible: boolean;
  imagen: string;
}

// Interface de Reserva
export interface Reserva {
  id?: number;
  clienteId: number;
  habitacionId: number;
  fechaEntrada: string;
  fechaSalida: string;
  estado: string;

  //variables opcionales, no vienen del backend
  editando? : boolean;
}
