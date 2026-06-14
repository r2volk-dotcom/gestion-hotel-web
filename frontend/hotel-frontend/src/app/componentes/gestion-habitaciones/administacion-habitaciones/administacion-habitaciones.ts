import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion, Servicios } from '../../../models'; // interfaces necesarias

import { HabitacionService } from '../../habitaciones/habitacion.service';
import { ServicioService } from '../gestion-servicios/servicio.service';

// subcomponentes del modulo
import { FormularioHabitacion } from './registrar-habitacion/registrar-habitacion';
import { TablaHabitaciones } from './tabla-habitaciones/tabla-habitaciones';


@Component({
  selector: 'app-panel-habitaciones',
  imports: [CommonModule, FormsModule, FormularioHabitacion, TablaHabitaciones],
  templateUrl: './administacion-habitaciones.html',
  styleUrl: './administacion-habitaciones.css',
})
// Componente de panel para la administracion de habitaciones
export class PanelHabitaciones implements OnInit {
  // Datos de entrada y eventos de salida
  @Input() habitaciones: Habitacion[] = [];
  @Output() habitacionesCambiar = new EventEmitter<void>();

  // Inyecta detector de cambios
  constructor(
    private habitacionService: HabitacionService,
    private servicioService: ServicioService,
    private cdr: ChangeDetectorRef
  ) {}

  // Listas y estados locales
  serviciosDisponibles: Servicios[] = [];
  serviciosSeleccionados: number[] = [];
  nombreImagen: string = '';
  
  // Modelo temporal para nueva habitacion
  nuevaHabitacion: Habitacion = {
    tipo: '',                        
    precio: null,                       
    disponible: true,
    imagen:'',
    codigo: null,
    descripcion: null,
    servicios: []      
  };

  // Estados de edicion
  idHabitacionEdicion: number | null = null;
  imagenOriginalEdicion: string = '';

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarServicios(); // carga de servicios inicial
  }


  async cargarServicios() {

    this.serviciosDisponibles = await this.servicioService.obtenerServicios();

    // Remueve de la seleccion local los servicios eliminados
    const idsDisponibles = this.serviciosDisponibles.map(s => s.id);
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(id => idsDisponibles.includes(id));
    
    this.cdr.detectChanges(); // Notifica cambios a Angular
  }

  async eliminarHabitacion(idEliminar: number) {
    await this.habitacionService.eliminarHabitacion(idEliminar);
    this.habitacionesCambiar.emit();
  }


  // Selecciona o deselecciona un servicio
  toggleServicio(id: number) {
    const indice = this.serviciosSeleccionados.indexOf(id);
    if (indice === -1) {
        this.serviciosSeleccionados.push(id); // agrega servicio
    } else {
        this.serviciosSeleccionados.splice(indice, 1); // remueve servicio
    }
  }

  // Procesa y convierte la imagen seleccionada a base64 para la BD
  alSeleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    // Valida que el formato sea PNG
    if (archivo.type !== 'image/png') {
      alert('Solo se permiten archivos PNG');
      return;
    }

    // Valida tamaño maximo
    if (archivo.size > 1048576) {
      alert('La imagen no debe superar 1MB');
      return;
    }

    // Lector de archivos para conversion
    const lector = new FileReader();
    lector.onload = () => {
      this.nuevaHabitacion.imagen = lector.result as string;
      this.nombreImagen = archivo.name;
      this.cdr.detectChanges();
    };
    lector.readAsDataURL(archivo);
  }

  // Guarda los datos del registro o edicion
  async guardarHabitacion() {
    // Asocia los servicios seleccionados
    this.nuevaHabitacion.servicios = this.serviciosSeleccionados.map(id => {
      return { id: id } as Servicios;
    });

    if (this.nuevaHabitacion.precio === null) {
      this.nuevaHabitacion.precio = 0;
    }

    if (this.idHabitacionEdicion !== null) {
      // Modo edicion, mantiene imagen anterior si no se sube una nueva
      if (!this.nuevaHabitacion.imagen) {
        this.nuevaHabitacion.imagen = this.imagenOriginalEdicion;
      }

      // Peticion HTTP PUT para actualizar
      await this.habitacionService.actualizarHabitacion(this.idHabitacionEdicion, this.nuevaHabitacion);

      // Limpia estados de edicion
      this.idHabitacionEdicion = null;
      this.imagenOriginalEdicion = '';

    } else { // Modo registro, nueva habitacion
      await this.habitacionService.guardarHabitacion(this.nuevaHabitacion);
    }

    // Reinicia el modelo del formulario
    this.nuevaHabitacion = {
      tipo: '',
      precio: null,
      disponible: true,
      imagen: '',
      codigo: null,
      descripcion: null
    };

    // Limpia variables locales
    this.serviciosSeleccionados = [];
    this.nombreImagen = '';

    // Notifica cambios al padre
    this.habitacionesCambiar.emit();
  }

  // Carga los datos de la habitacion en el formulario para editar
  iniciarEdicion(habitacion: Habitacion) {
    this.idHabitacionEdicion = habitacion.id || null;
    this.imagenOriginalEdicion = habitacion.imagen || '';

    // Llena modelo temporal
    this.nuevaHabitacion = {
      tipo: habitacion.tipo,
      precio: habitacion.precio,
      disponible: habitacion.disponible,
      imagen: '', 
      codigo: habitacion.codigo || null,
      descripcion: habitacion.descripcion || null,
      servicios: habitacion.servicios || []
    };

    // Llena servicios seleccionados
    this.serviciosSeleccionados = habitacion.servicios ? habitacion.servicios.map(s => s.id!) : [];
    this.nombreImagen = '';
    this.cdr.detectChanges();
  }

  // Cancela la edicion y limpia el formulario
  cancelarEdicion() {
    this.idHabitacionEdicion = null;
    this.imagenOriginalEdicion = '';
    
    // Reinicia modelo temporal
    this.nuevaHabitacion = {
      tipo: '',
      precio: null,
      disponible: true,
      imagen: '',
      codigo: null,
      descripcion: null,
      servicios: []
    };

    // Limpia variables locales
    this.serviciosSeleccionados = [];
    this.nombreImagen = '';
    this.cdr.detectChanges();
  }
}
