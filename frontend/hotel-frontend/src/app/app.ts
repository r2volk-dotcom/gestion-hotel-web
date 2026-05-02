import { Component } from '@angular/core'; // necesario de Angular
import { CommonModule } from '@angular/common'; // funcionalidades basicas (como ngFor)


// Decorador que define el componente
@Component({
  selector: 'app-root', // nombre del componente
  imports: [CommonModule], // habilita ngFor
  templateUrl: './app.html', // HTML que usa
  styleUrl: './app.css' // estilos
})
export class App {

  habitaciones: any[] = [];
  clientes: any[] = [];
  reservas: any[] = [];

  async cargarHabitaciones() {
    //pide al backend
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    // convierte la respuesta a json
    const datos = await respuesta.json();
    //guarda los datos en la lista
    this.habitaciones = datos;
  }

  // Funcion para cargar clientes
  async cargarClientes() {
    const respuesta = await fetch('http://localhost:8080/clientes');
    const datos = await respuesta.json();
    this.clientes = datos;
  }


  // Funcion asincrona para cargar reservas
  async cargarReservas() {
    const respuesta = await fetch('http://localhost:8080/reservas');
    const datos = await respuesta.json();
    this.reservas = datos;
  }

}
