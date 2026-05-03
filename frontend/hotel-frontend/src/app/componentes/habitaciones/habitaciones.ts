import { Component, OnInit,ChangeDetectorRef } from '@angular/core'; // angular
import { CommonModule } from '@angular/common'; // ngFor
import { FormsModule } from '@angular/forms'; // ngModel
import { Habitacion } from '../../models'; // interface

@Component({
  selector: 'app-habitaciones', // etiqueta <app-habitaciones>
  imports: [CommonModule, FormsModule],
  templateUrl: './habitaciones.html',
  styleUrl: './habitaciones.css'
})

export class Habitaciones implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  // lista de habitaciones
  habitaciones: Habitacion[] = [];

  // objeto del formulario
  nuevaHabitacion: Habitacion = {
    tipo: '',
    precio: 0,
    disponible: true
  };

  // se ejecuta al cargar el componente
  async ngOnInit() {
    await this.cargarHabitaciones();
  }

  // pide habitaciones al backend
  async cargarHabitaciones() {
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    const datos = await respuesta.json();
    this.habitaciones = datos;
    this.cdr.detectChanges();
  }

  // guarda habitacion en backend
  async guardarHabitacion() {
    const respuesta = await fetch('http://localhost:8080/habitaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.nuevaHabitacion)
    });

    const habitacionGuardada = await respuesta.json();

    this.habitaciones.push(habitacionGuardada); // la agrega a la lista

    // limpia formulario
    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true
    };
    this.cdr.detectChanges();
  }
}
