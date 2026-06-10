// Importa Component, OnInit, ChangeDetectorRef, Output, EventEmitter de Angular
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa FormsModule para enlazar formularios
import { FormsModule } from '@angular/forms';
// Importa la interfaz Servicios
import { Servicios} from '../../../models';
// Importa la URL base del backend
import { API_BASE_URL } from '../../../api.config';

// Decorador del componente
@Component({
  selector: 'app-gestion-servicios', // etiqueta HTML
  imports: [CommonModule, FormsModule], // modulos importados
  templateUrl: './gestion-servicios.html', // plantilla HTML
  styleUrl: './gestion-servicios.css', // archivo de estilos
})
// Componente para la administracion de servicios adicionales
export class GestionServicios implements OnInit {
  // Inyecta detector de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // Evento que notifica cambios al panel principal
  @Output() serviciosCambiar = new EventEmitter<void>();

  // Lista local y campo de texto
  serviciosDisponibles: Servicios[] = [];
  nuevoServicio: string = '';

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarServicios(); // carga inicial de servicios
  }

  // Obtiene los servicios desde el servidor
  async cargarServicios() {
    // Peticion HTTP GET
    const respuesta = await fetch(`${API_BASE_URL}/servicios`);
    // Convierte respuesta a JSON
    const datos = await respuesta.json();
    // Asigna la lista de servicios
    this.serviciosDisponibles = datos;
    // Notifica cambios a Angular
    this.cdr.detectChanges();
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

    // Filtra la lista local de servicios
    this.serviciosDisponibles = this.serviciosDisponibles.filter(
      s => s.id !== id
    );
    // Notifica cambios a Angular
    this.cdr.detectChanges();
    this.serviciosCambiar.emit();
  }
}
