// importa Component, OnInit (ciclo de vida) y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// importa CommonModule para usar directivas como *ngIf y *ngFor
import { CommonModule } from '@angular/common';
// importa FormsModule para usar [(ngModel)] (two-way binding)
import { FormsModule } from '@angular/forms';
// importa la interface Habitacion desde el archivo de modelos
import { Habitacion } from '../../models';

// decorador que define el componente Habitaciones
@Component({
  selector: 'app-habitaciones',      // etiqueta HTML: <app-habitaciones>
  imports: [CommonModule, FormsModule], // modulos necesarios
  templateUrl: './habitaciones.html', // archivo de plantilla HTML
  styleUrl: './habitaciones.css'     // archivo de estilos CSS
})
// clase del componente Habitaciones que implementa OnInit
export class Habitaciones implements OnInit {
  // constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // array que almacena la lista de habitaciones cargadas
  habitaciones: Habitacion[] = [];
  
  // objeto que representa el formulario de nueva habitacion
  nuevaHabitacion: Habitacion = {
    tipo: '',                        // campo tipo vacio
    precio: 0,                       // campo precio en cero
    disponible: true                 // checkbox disponible activado
  };

  // metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones(); // carga las habitaciones desde el backend
  }

  // metodo async que obtiene la lista de habitaciones del backend
  async cargarHabitaciones() {
    // peticion GET al endpoint de habitaciones
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de habitaciones
    this.habitaciones = datos;
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }


  async eliminarHabitacion(idEliminar:number){
    await fetch(`http://localhost:8080/habitaciones/${idEliminar}`,
    {
      method: 'DELETE'
    });

    // esto actualiza la lista habitaciones, pero eliminando una habitacion si su ID es "idEliminar"
    this.habitaciones = this.habitaciones.filter(
      cliente => cliente.id !== idEliminar
    );
    this.cdr.detectChanges();
  }


  // metodo async que guarda una nueva habitacion en el backend
  async guardarHabitacion() {
    // peticion POST al endpoint de habitaciones
    const respuesta = await fetch('http://localhost:8080/habitaciones', {
      method: 'POST',                // metodo HTTP POST
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(this.nuevaHabitacion) // cuerpo con datos de la habitacion
    });

    // convierte la respuesta a JSON (habitacion guardada)
    const habitacionGuardada = await respuesta.json();

    // agrega la nueva habitacion al array local
    this.habitaciones.push(habitacionGuardada);

    // reinicia el formulario con valores por defecto
    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true
    };
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }
}
