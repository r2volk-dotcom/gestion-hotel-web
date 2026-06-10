// Importa Component, OnInit (ciclo de vida) y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// Importa CommonModule para ngClass
import { CommonModule } from '@angular/common';
// Importa la interface Habitacion desde el archivo de modelos
import { Habitacion } from '../../models';
// Importa la URL base de la API
import { API_BASE_URL } from '../../api.config';

// Decorador que define el componente Habitaciones
@Component({
  selector: 'app-habitaciones',      // etiqueta HTML: <app-habitaciones>
  imports: [CommonModule],
  templateUrl: './habitaciones.html', // archivo de plantilla HTML
  styleUrl: './habitaciones.css'     // archivo de estilos CSS
})
// Clase del componente Habitaciones que implementa OnInit
export class Habitaciones implements OnInit {
  // Constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // Habitaciones cargadas
  habitaciones: Habitacion[] = [];

  // Metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones();
  }

  // Metodo async que obtiene la lista de habitaciones del backend
  async cargarHabitaciones() {
    // Peticion GET al endpoint de habitaciones
    const respuesta = await fetch(`${API_BASE_URL}/habitaciones`);
    // Convierte la respuesta a JSON
    const datos = await respuesta.json();
    // Asigna los datos al array de habitaciones
    this.habitaciones = datos;
    // Fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

  // Obtiene la url o base64 de la imagen de la habitacion
  obtenerImagen(habitacion: Habitacion): string {
    return habitacion.imagen || ''; // retorna la imagen o texto vacio
  }

  // Elimina una habitacion por su ID en el backend
  async eliminarHabitacion(idEliminar:number){
    // Peticion DELETE al endpoint de habitaciones con el ID especifico
    await fetch(`${API_BASE_URL}/habitaciones/${idEliminar}`,
    {
      method: 'DELETE'
    });

    // Actualiza la lista local de habitaciones excluyendo la eliminada
    this.habitaciones = this.habitaciones.filter(
      cliente => cliente.id !== idEliminar
    );
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

}
