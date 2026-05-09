// importa Component, OnInit (ciclo de vida) y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// importa CommonModule para usar *ngIf, *ngFor, *ngClass
import { CommonModule } from '@angular/common';
// importa FormsModule para usar [(ngModel)] (two-way binding)
import { FormsModule } from '@angular/forms';
// importa las interfaces Cliente, Habitacion y Reserva
import { Cliente, Habitacion, Reserva } from '../../models';

// decorador que define el componente Reservas
@Component({
  selector: 'app-reservas',          // etiqueta HTML: <app-reservas>
  imports: [CommonModule, FormsModule], // modulos necesarios
  templateUrl: './reservas.html',    // archivo de plantilla HTML
  styleUrl: './reservas.css'         // archivo de estilos CSS
})
// clase del componente Reservas que implementa OnInit
export class Reservas implements OnInit {
  // constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // array que almacena la lista de clientes (para el select)
  clientes: Cliente[] = [];
  // array que almacena la lista de habitaciones (para el select)
  habitaciones: Habitacion[] = [];
  // array que almacena la lista de reservas cargadas
  reservas: Reserva[] = [];

  cambiarEstado(reserva: Reserva){
    reserva.editando = !reserva.editando;
  }

  // objeto que representa el formulario de nueva reserva
  nuevaReserva: Reserva = {
    clienteId: 0,                    // ID de cliente (0 = ninguno)
    habitacionId: 0,                 // ID de habitacion (0 = ninguna)
    fechaEntrada: '',                // fecha de entrada vacia
    fechaSalida: '',                 // fecha de salida vacia
    estado: 'RESERVADO'              // estado por defecto
  };

  // metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarDatos();        // carga todos los datos necesarios
  }

  // metodo que carga clientes, habitaciones y reservas en secuencia
  async cargarDatos() {
    await this.cargarClientes();     // primero carga clientes
    await this.cargarHabitaciones(); // luego carga habitaciones
    await this.cargarReservas();     // finalmente carga reservas
  }

  // metodo async que obtiene clientes del backend
  async cargarClientes() {
    // peticion GET al endpoint de clientes
    const respuesta = await fetch('http://localhost:8080/clientes');
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de clientes
    this.clientes = datos;
  }
  
  async editarEstado(estado:string, id:number, reserva:Reserva){
    let endpoint = "";
    if (estado === "CheckOut") {
        endpoint = "checkout";
      } else if (estado === "CheckIn") {
        endpoint = "checkin";
      } else if (estado === "Cancelado"){
        endpoint = "cancelar";
      } else {
        return;
      }
    const respuesta = await fetch(`http://localhost:8080/reservas/${id}/${endpoint}`,{
        method: 'PUT'
    })

    reserva.editando = false;
    this.cargarDatos();
  }

  // metodo async que obtiene habitaciones del backend
  async cargarHabitaciones() {
    // peticion GET al endpoint de habitaciones
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de habitaciones
    this.habitaciones = datos;
  }

  // metodo async que obtiene reservas del backend
  async cargarReservas() {
    // peticion GET al endpoint de reservas
    const respuesta = await fetch('http://localhost:8080/reservas');
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de reservas
    this.reservas = datos;
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

  // metodo que busca y devuelve el nombre completo de un cliente por su ID
  obtenerNombreCliente(clienteId: number): string {
    // busca el cliente en el array que coincida con el ID
    const cliente = this.clientes.find(c => c.id === clienteId);

    // si no encuentra el cliente, retorna mensaje de error
    if (!cliente) {
      return 'cliente no encontrado';
    }

    // retorna nombre y apellido concatenados
    return cliente.nombre + ' ' + cliente.apellido;
  }

  // metodo que busca y devuelve el texto descriptivo de una habitacion por su ID
  obtenerTextoHabitacion(habitacionId: number): string {
    // busca la habitacion en el array que coincida con el ID
    const habitacion = this.habitaciones.find(h => h.id === habitacionId);

    // si no encuentra la habitacion, retorna mensaje de error
    if (!habitacion) {
      return 'habitacion no encontrada';
    }

    // retorna tipo y precio concatenados
    return habitacion.tipo + ' - S/ ' + habitacion.precio;
  }

  // metodo async que guarda una nueva reserva en el backend
  async guardarReserva() {
    // valida que se haya seleccionado cliente y habitacion
    if (this.nuevaReserva.clienteId === 0 || this.nuevaReserva.habitacionId === 0) {
      alert('selecciona cliente y habitacion'); // alerta al usuario
      return;                       // sale del metodo sin hacer nada
    }

    // peticion POST al endpoint de reservas
    const respuesta = await fetch('http://localhost:8080/reservas', {
      method: 'POST',                // metodo HTTP POST
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(this.nuevaReserva) // cuerpo con datos de la reserva
    });

    // convierte la respuesta a JSON (reserva guardada)
    const reservaGuardada = await respuesta.json();

    // agrega la nueva reserva al array local
    this.reservas.push(reservaGuardada);

    // reinicia el formulario con valores por defecto
    this.nuevaReserva = {
      clienteId: 0,
      habitacionId: 0,
      fechaEntrada: '',
      fechaSalida: '',
      estado: 'RESERVADO'
    };
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }
}
