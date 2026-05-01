import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  habitaciones: any[] = [];
  clientes: any[] = [];

  cargarHabitaciones() {
    fetch('http://localhost:8080/habitaciones')
      .then(respuesta => respuesta.json())
      .then(datos => {
        this.habitaciones = datos;
      });
  }

  cargarClientes() {
    fetch('http://localhost:8080/clientes')
      .then(respuesta => respuesta.json())
      .then(datos => {
        this.clientes = datos;
      });
  }
}
