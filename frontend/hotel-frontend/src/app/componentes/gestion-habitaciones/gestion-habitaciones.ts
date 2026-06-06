import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
// importa CommonModule para ngClass, ngModel y ngValue
import { CommonModule } from '@angular/common';
// importa FormsModule para usar [(ngModel)] (two-way binding)
import { FormsModule } from '@angular/forms';
// importa la interface Habitacion desde el archivo de modelos
import { Habitacion, Servicios} from '../../models';


@Component({
  selector: 'app-gestion-habitaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-habitaciones.html',
  styleUrl: './gestion-habitaciones.css',
})
export class GestionHabitaciones {

  // constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // habitaciones cargadas
  habitaciones: Habitacion[] = [];
  
  serviciosDisponibles: Servicios[] = [];
  serviciosSeleccionados: number[] = [];
  
  mostrarFormulario: boolean = false;
  abrirFormulario() { this.mostrarFormulario = true; }
  cerrarFormulario() { this.mostrarFormulario = false; }
  
  // objeto que representa el formulario de nueva habitacion
  nuevaHabitacion: Habitacion = {
    tipo: '',                        
    precio: 0,                       
    disponible: true,
    imagen:'',
    servicios: []      
  };

  // metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarHabitaciones();
    await this.cargarServicios(); 
  }

  // metodo async que obtiene la lista de habitaciones del backend
  async cargarHabitaciones() {
    // peticion GET al endpoint de habitaciones
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de habitaciones
    this.habitaciones = datos;
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

  async cargarServicios() {
    const respuesta = await fetch('http://localhost:8080/servicios');
    const datos = await respuesta.json();
    this.serviciosDisponibles = datos;
    this.cdr.detectChanges();
  }

  async eliminarHabitacion(idEliminar:number){
    await fetch(`http://localhost:8080/habitaciones/${idEliminar}`,
    {
      method: 'DELETE'
    });

    // esto actualiza la lista habitaciones, pero eliminando una habitacion si su ID es "idEliminar"
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


  // metodo async que guarda una nueva habitacion en el backend
  async guardarHabitacion() {
    // convierte los IDs de servicios seleccionados a objetos Servicio con solo el ID
    this.nuevaHabitacion.servicios = this.serviciosSeleccionados.map(id => {
      return { id: id } as Servicios;
    });

    // peticion POST al endpoint de habitaciones
    const respuesta = await fetch('http://localhost:8080/habitaciones', {
      method: 'POST',                // metodo HTTP POST
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(this.nuevaHabitacion) // cuerpo con datos de la habitacion
    });

    // convierte la respuesta a JSON (habitacion guardada)
    const habitacionGuardada = await respuesta.json();

    // agrega la nueva habitacion al array local
    this.habitaciones.push(habitacionGuardada);

    // reinicia el formulario con valores por defecto
    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true,
      imagen:'' 
    };

    this.serviciosSeleccionados = [];

    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

}
