import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicios} from '../../../../models';
import { API_BASE_URL } from '../../../../api.config';

@Component({
  selector: 'app-gestion-servicios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-servicios.html',
  styleUrl: './gestion-servicios.css',
})
export class GestionServicios implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  @Output() serviciosCambiar = new EventEmitter<void>();

  serviciosDisponibles: Servicios[] = [];
  nuevoServicio: string = '';

  async ngOnInit() {
    await this.cargarServicios();
  }

  async cargarServicios() {
    const respuesta = await fetch(`${API_BASE_URL}/servicios`);
    const datos = await respuesta.json();
    this.serviciosDisponibles = datos;
    this.cdr.detectChanges();
  }

  async guardarServicio() {
    if (!this.nuevoServicio.trim()) return;

    await fetch(`${API_BASE_URL}/servicios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: this.nuevoServicio.trim() })
    });

    this.nuevoServicio = '';
    await this.cargarServicios();
    this.serviciosCambiar.emit();
  }

  async eliminarServicio(id: number) {
    await fetch(`${API_BASE_URL}/servicios/${id}`, {
      method: 'DELETE'
    });

    this.serviciosDisponibles = this.serviciosDisponibles.filter(
      s => s.id !== id
    );
    this.cdr.detectChanges();
    this.serviciosCambiar.emit();
  }
}

