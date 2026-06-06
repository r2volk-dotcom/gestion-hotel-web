// importa Component, OnInit (ciclo de vida) y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// importa CommonModule para ngClass
import { CommonModule } from '@angular/common';
// importa la interface Habitacion desde el archivo de modelos
import { Habitacion } from '../../models';

// decorador que define el componente Habitaciones
@Component({
  selector: 'app-habitaciones',      // etiqueta HTML: <app-habitaciones>
  imports: [CommonModule],
  templateUrl: './habitaciones.html', // archivo de plantilla HTML
  styleUrl: './habitaciones.css'     // archivo de estilos CSS
})
// clase del componente Habitaciones que implementa OnInit
export class Habitaciones implements OnInit {
  // constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // habitaciones cargadas
  habitaciones: Habitacion[] = [];

  // metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones();
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

  obtenerImagen(habitacion: Habitacion): string {
    return habitacion.imagen || '';
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

}
