import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../models';
import { HabitacionService } from './habitacion.service';


@Component({
  selector: 'app-habitaciones', 
  imports: [CommonModule],
  templateUrl: './habitaciones.html', 
  styleUrl: './habitaciones.css'
})

export class Habitaciones implements OnInit {

  constructor(
    private habitacionService: HabitacionService, // servicios
    private cdr: ChangeDetectorRef // detector de cambios
  ) {}

  // Habitaciones cargadas
  habitaciones: Habitacion[] = [];

  // Metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones();
  }

  async cargarHabitaciones() {
    this.habitaciones = await this.habitacionService.obtenerHabitaciones();
    this.cdr.detectChanges();
  }

  // Obtiene la url o base64 de la imagen de la habitacion
  obtenerImagen(habitacion: Habitacion): string {
    return habitacion.imagen || ''; // retorna la imagen o texto vacio
  }

  // Elimina una habitacion por su ID en el backend
  async eliminarHabitacion(idEliminar:number){

    await this.habitacionService.eliminarHabitacion(idEliminar);

    // Actualiza la lista local de habitaciones excluyendo la eliminada
    this.habitaciones = this.habitaciones.filter(
      habitacion => habitacion.id !== idEliminar
    );
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

}
