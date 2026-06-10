// Importa Component, OnInit, ChangeDetectorRef, Input, Output y EventEmitter de Angular
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa FormsModule para formularios
import { FormsModule } from '@angular/forms';
// Importa las interfaces necesarias
import { Habitacion, Servicios } from '../../../models';
// Importa la URL base del backend
import { API_BASE_URL } from '../../../api.config';
// Importa los subcomponentes del modulo
import { FormularioHabitacion } from './registrar-habitacion/registrar-habitacion';
import { TablaHabitaciones } from './tabla-habitaciones/tabla-habitaciones';

// Decorador del componente
@Component({
  selector: 'app-panel-habitaciones', // etiqueta HTML
  imports: [CommonModule, FormsModule, FormularioHabitacion, TablaHabitaciones], // componentes importados
  templateUrl: './administacion-habitaciones.html', // plantilla HTML
  styleUrl: './administacion-habitaciones.css', // archivo de estilos
})
// Componente de panel para la administracion de habitaciones
export class PanelHabitaciones implements OnInit {
  // Datos de entrada y eventos de salida
  @Input() habitaciones: Habitacion[] = [];
  @Output() habitacionesCambiar = new EventEmitter<void>();

  // Inyecta detector de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // Listas y estados locales
  serviciosDisponibles: Servicios[] = [];
  serviciosSeleccionados: number[] = [];
  nombreImagen: string = '';
  
  // Modelo temporal para nueva habitacion
  nuevaHabitacion: Habitacion = {
    tipo: '',                        
    precio: 0,                       
    disponible: true,
    imagen:'',
    servicios: []      
  };

  // Estados de edicion
  idHabitacionEdicion: number | null = null;
  imagenOriginalEdicion: string = '';

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarServicios(); // carga de servicios inicial
  }

  // Obtiene los servicios del servidor
  async cargarServicios() {
    // Peticion HTTP GET
    const respuesta = await fetch(`${API_BASE_URL}/servicios`);
    // Convierte respuesta a JSON
    const datos = await respuesta.json();
    // Asigna servicios disponibles
    this.serviciosDisponibles = datos;
    
    // Remueve de la seleccion local los servicios eliminados
    const idsDisponibles = this.serviciosDisponibles.map(s => s.id);
    this.serviciosSeleccionados = this.serviciosSeleccionados.filter(id => idsDisponibles.includes(id));
    
    // Notifica cambios a Angular
    this.cdr.detectChanges();
  }

  // Elimina una habitacion
  async eliminarHabitacion(idEliminar: number) {
    // Peticion HTTP DELETE
    await fetch(`${API_BASE_URL}/habitaciones/${idEliminar}`, {
      method: 'DELETE'
    });
    // Notifica cambios al padre
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

  // Procesa y convierte la imagen seleccionada a base64
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

    if (this.idHabitacionEdicion !== null) {
      // Modo edicion: mantiene imagen anterior si no se sube una nueva
      if (!this.nuevaHabitacion.imagen) {
        this.nuevaHabitacion.imagen = this.imagenOriginalEdicion;
      }

      // Peticion HTTP PUT para actualizar
      await fetch(`${API_BASE_URL}/habitaciones/${this.idHabitacionEdicion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nuevaHabitacion)
      });

      // Limpia estados de edicion
      this.idHabitacionEdicion = null;
      this.imagenOriginalEdicion = '';

    } else {
      // Modo registro: peticion HTTP POST
      await fetch(`${API_BASE_URL}/habitaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.nuevaHabitacion)
      });
    }

    // Reinicia el modelo del formulario
    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true,
      imagen: ''
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
      precio: 0,
      disponible: true,
      imagen: '',
      servicios: []
    };

    // Limpia variables locales
    this.serviciosSeleccionados = [];
    this.nombreImagen = '';
    this.cdr.detectChanges();
  }
}
