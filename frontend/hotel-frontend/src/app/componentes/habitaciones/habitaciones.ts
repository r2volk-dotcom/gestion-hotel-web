import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitacion, Promociones } from '../../models';
import { HabitacionService } from './habitacion.service';
import { PromocionService } from '../gestion-habitaciones/gestion-promociones/promocion.service';
import { ModalHabitacion } from './modal-habitacion/modal-habitacion';

@Component({
  selector: 'app-habitaciones', 
  imports: [CommonModule, ModalHabitacion],
  templateUrl: './habitaciones.html', 
  styleUrl: './habitaciones.css'
})

export class Habitaciones implements OnInit {

  constructor(
    private habitacionService: HabitacionService, // servicios
    // Inyecta el servicio de promociones como publico
    public promocionService: PromocionService,
    private cdr: ChangeDetectorRef // detector de cambios
  ) {}

  habitaciones: Habitacion[] = [];

  // Controla la visibilidad del modal
  mostrarModal = false;
  // Almacena la habitacion seleccionada para el modal
  habitacionSeleccionada: Habitacion | null = null;

  // Metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones();
    // Carga la promocion activa usando el servicio
    await this.promocionService.cargarPromocionActiva();
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

  // Abre el modal de habitacion
  abrirModal(habitacion: Habitacion) {
    this.habitacionSeleccionada = habitacion;
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  // Cierra el modal de habitacion
  cerrarModal() {
    this.mostrarModal = false;
    this.habitacionSeleccionada = null;
    this.cdr.detectChanges();
  }

}
