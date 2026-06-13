import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicios} from '../../../models';
import { API_BASE_URL } from '../../../api.config'; // URL base del backend

// Decorador del componente
@Component({
  selector: 'app-gestion-servicios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-servicios.html',
  styleUrl: './gestion-servicios.css',
})
// OnInit para que se incialicen apartados que definimos en ngOnInit()
export class GestionServicios implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {} // detector de cambios

  @Output() serviciosCambiar = new EventEmitter<void>(); // envia cambios al panel (registrar habitacion)

  serviciosDisponibles: Servicios[] = [];
  nuevoServicio: string = '';

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarServicios(); // carga inicial de servicios
  }

  async cargarServicios() {
    const respuesta = await fetch(`${API_BASE_URL}/servicios`);
    const datos = await respuesta.json(); // Convierte respuesta a JSON
    this.serviciosDisponibles = datos;
    this.cdr.detectChanges(); // Notifica cambios a Angular
  }

  // Guarda un nuevo servicio en el servidor
  async guardarServicio() {
    if (!this.nuevoServicio.trim()) return;

    // Peticion HTTP POST
    await fetch(`${API_BASE_URL}/servicios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: this.nuevoServicio.trim() })
    });

    // Limpia el campo de texto y recarga la lista
    this.nuevoServicio = '';
    await this.cargarServicios();
    this.serviciosCambiar.emit();
  }

  // Elimina un servicio por su ID
  async eliminarServicio(id: number) {
    // Peticion HTTP DELETE
    await fetch(`${API_BASE_URL}/servicios/${id}`, {
      method: 'DELETE'
    });

    // reemplaza la lista antigua, por una nueva sin ese servicio
    this.serviciosDisponibles = this.serviciosDisponibles.filter(
      s => s.id !== id
    );
    // Notifica cambios a Angular
    this.cdr.detectChanges();
    this.serviciosCambiar.emit();
  }
}
