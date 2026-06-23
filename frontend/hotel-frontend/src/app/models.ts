//export significa que puede usarse en otros archivos

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
  precio: number | null;
  disponible: boolean;
  imagen: string;
  codigo: string | null;
  descripcion: string | null;

  //variables opcionales, no vienen del backend
  servicios?: Servicios[]; 
}

// Interface de Reserva
export interface Reserva {
  id?: number;
  clienteId: number;
  habitacionId: number;
  empleadoId?: number; // ID del empleado que realizó/editó la reserva
  fechaEntrada: string;
  fechaSalida: string;
  estado: string;

  // Campos financieros e históricos
  precioPorNoche?: number;
  precioTotal?: number;
  promocionAplicada?: string;

  // variables opcionales, no vienen del backend
  editando?: boolean;
}

// Interface de Servicios
export interface Servicios {
  id?: number;
  nombre: string;
}

// Interface de Empleado
export interface Empleado {
  id?: number;
  nombre: string;
  apellido: string;
  usuario: string;
  contrasena: string;
  rol: string;
  imagen: string;
}

// Interface de Promocion
export interface Promociones {
  id?: number;
  nombre: string;
  descuento: number; // Ej: 0.10 para 10%
  activa: boolean;
}

//Interface de Pago
export interface Pago {
  id?: number;
  reservaId: number;
  monto: number;
  metodoPago: string | null;    // null mientras esté pendiente
  estado: 'Pendiente' | 'Pagado';
  fechaPago: string | null;     // null mientras esté pendiente
}