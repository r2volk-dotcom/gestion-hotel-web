import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion, Servicios } from '../../models';
import { GestionServicios } from './componentes/gestion-servicios/gestion-servicios';
import { GraficoHabitaciones } from './componentes/grafico-habitaciones/grafico-habitaciones';

@Component({
  selector: 'app-gestion-habitaciones',
  imports: [CommonModule, FormsModule, GestionServicios, GraficoHabitaciones],
  templateUrl: './gestion-habitaciones.html',
  styleUrl: './gestion-habitaciones.css',
})
export class GestionHabitaciones implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {}

  habitaciones: Habitacion[] = [];
  
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
    await this.cargarHabitaciones();
    await this.cargarServicios(); 
  }

  async cargarHabitaciones() {
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    const datos = await respuesta.json();
    this.habitaciones = datos;
    this.cdr.detectChanges();
  }

  async cargarServicios() {
    const respuesta = await fetch('http://localhost:8080/servicios');
    const datos = await respuesta.json();
    this.serviciosDisponibles = datos;
    
    // Filtrar los servicios seleccionados para remover los que hayan sido borrados
    const idsDisponibles = this.serviciosDisponibles.map(s => s.id);
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(id => idsDisponibles.includes(id));
    
    this.cdr.detectChanges();
  }

  async editarHabitacion(id:number, tipo: string, precio: number, disponible:boolean, imagen: string, servicios: Servicios[]){
    const respuesta = await fetch(`http://localhost:8080/habitaciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tipo, precio, disponible, imagen, servicios })
    });

    const habitacionActualizada = await respuesta.json();
    const index = this.habitaciones.findIndex(h => h.id === id);
    if (index !== -1) {
      this.habitaciones[index] = habitacionActualizada;
      this.habitaciones = [...this.habitaciones]; // Reasignar para propagar cambios al gráfico
    }

    this.cdr.detectChanges();
  }

  async eliminarHabitacion(idEliminar:number){
    await fetch(`http://localhost:8080/habitaciones/${idEliminar}`,
    {
      method: 'DELETE'
    });

    this.habitaciones = this.habitaciones.filter(
      cliente => cliente.id !== idEliminar
    );
    this.cdr.detectChanges();
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

      const respuesta = await fetch(`http://localhost:8080/habitaciones/${this.idHabitacionEdicion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nuevaHabitacion)
      });

      const habitacionGuardada = await respuesta.json();
      
      const indice = this.habitaciones.findIndex(h => h.id === this.idHabitacionEdicion);
      if (indice !== -1) {
        this.habitaciones[indice] = habitacionGuardada;
        this.habitaciones = [...this.habitaciones]; // Reasignar para propagar cambios al gráfico
      }

      this.idHabitacionEdicion = null;
      this.imagenOriginalEdicion = '';

    } else {
      // MODO REGISTRO
      const respuesta = await fetch('http://localhost:8080/habitaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nuevaHabitacion)
      });

      const habitacionGuardada = await respuesta.json();
      this.habitaciones = [...this.habitaciones, habitacionGuardada]; // Reasignar para propagar cambios al gráfico
    }

    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true,
      imagen: ''
    };

    this.serviciosSeleccionados = [];
    this.nombreImagen = '';

    this.cdr.detectChanges();
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
