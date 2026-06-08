import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion, Servicios } from '../../../../models';
import { API_BASE_URL } from '../../../../api.config';
import { FormularioHabitacion } from './componentes/formulario-habitacion/formulario-habitacion';
import { TablaHabitaciones } from './componentes/tabla-habitaciones/tabla-habitaciones';

@Component({
  selector: 'app-panel-habitaciones',
  imports: [CommonModule, FormsModule, FormularioHabitacion, TablaHabitaciones],
  templateUrl: './panel-habitaciones.html',
  styleUrl: './panel-habitaciones.css',
})
export class PanelHabitaciones implements OnInit {
  @Input() habitaciones: Habitacion[] = [];
  @Output() habitacionesCambiar = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  serviciosDisponibles: Servicios[] = [];
  serviciosSeleccionados: number[] = [];
  nombreImagen: string = '';
  
  nuevaHabitacion: Habitacion = {
    tipo: '',                        
    precio: 0,                       
    disponible: true,
    imagen:'',
    servicios: []      
  };

  idHabitacionEdicion: number | null = null;
  imagenOriginalEdicion: string = '';

  async ngOnInit() {
    await this.cargarServicios(); 
  }

  async cargarServicios() {
    const respuesta = await fetch(`${API_BASE_URL}/servicios`);
    const datos = await respuesta.json();
    this.serviciosDisponibles = datos;
    
    // Filtrar los servicios seleccionados para remover los que hayan sido borrados
    const idsDisponibles = this.serviciosDisponibles.map(s => s.id);
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(id => idsDisponibles.includes(id));
    
    this.cdr.detectChanges();
  }

  async eliminarHabitacion(idEliminar: number) {
    await fetch(`${API_BASE_URL}/habitaciones/${idEliminar}`, {
      method: 'DELETE'
    });
    this.habitacionesCambiar.emit();
  }

  toggleServicio(id: number) {
    const indice = this.serviciosSeleccionados.indexOf(id);
    if (indice === -1) {
        this.serviciosSeleccionados.push(id);
    } else {
        this.serviciosSeleccionados.splice(indice, 1);
    }
  }

  alSeleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    if (archivo.type !== 'image/png') {
      alert('Solo se permiten archivos PNG');
      return;
    }

    if (archivo.size > 1048576) {
      alert('La imagen no debe superar 1MB');
      return;
    }

    const lector = new FileReader();
    lector.onload = () => {
      this.nuevaHabitacion.imagen = lector.result as string;
      this.nombreImagen = archivo.name;
      this.cdr.detectChanges();
    };
    lector.readAsDataURL(archivo);
  }

  async guardarHabitacion() {
    this.nuevaHabitacion.servicios = this.serviciosSeleccionados.map(id => {
      return { id: id } as Servicios;
    });

    if (this.idHabitacionEdicion !== null) {
      // MODO EDICIÓN: si no se seleccionó nueva imagen, mantener la original
      if (!this.nuevaHabitacion.imagen) {
        this.nuevaHabitacion.imagen = this.imagenOriginalEdicion;
      }

      await fetch(`${API_BASE_URL}/habitaciones/${this.idHabitacionEdicion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nuevaHabitacion)
      });

      this.idHabitacionEdicion = null;
      this.imagenOriginalEdicion = '';

    } else {
      // MODO REGISTRO
      await fetch(`${API_BASE_URL}/habitaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nuevaHabitacion)
      });
    }

    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true,
      imagen: ''
    };

    this.serviciosSeleccionados = [];
    this.nombreImagen = '';

    this.habitacionesCambiar.emit();
  }

  iniciarEdicion(habitacion: Habitacion) {
    this.idHabitacionEdicion = habitacion.id || null;
    this.imagenOriginalEdicion = habitacion.imagen || '';

    this.nuevaHabitacion = {
      tipo: habitacion.tipo,
      precio: habitacion.precio,
      disponible: habitacion.disponible,
      imagen: '', // no es necesario rellenar la imagen, pero se permite editarla
      servicios: habitacion.servicios || []
    };

    this.serviciosSeleccionados = habitacion.servicios ? habitacion.servicios.map(s => s.id!) : [];
    this.nombreImagen = '';
    this.cdr.detectChanges();
  }

  cancelarEdicion() {
    this.idHabitacionEdicion = null;
    this.imagenOriginalEdicion = '';
    
    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true,
      imagen: '',
      servicios: []
    };

    this.serviciosSeleccionados = [];
    this.nombreImagen = '';
    this.cdr.detectChanges();
  }
}
