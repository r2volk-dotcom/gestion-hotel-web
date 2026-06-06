import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion, Servicios} from '../../models';
import { GestionServicios } from '../gestion-servicios/gestion-servicios';

@Component({
  selector: 'app-gestion-habitaciones',
  imports: [CommonModule, FormsModule, GestionServicios],
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

    const respuesta = await fetch('http://localhost:8080/habitaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.nuevaHabitacion)
    });

    const habitacionGuardada = await respuesta.json();
    this.habitaciones.push(habitacionGuardada);

    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true,
      imagen:'' 
    };

    this.serviciosSeleccionados = [];
    this.nombreImagen = '';

    this.cdr.detectChanges();
  }

}
