import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicios} from '../../../models';
import { ServicioService } from './servicio.service';

// Decorador del componente
@Component({
  selector: 'app-gestion-servicios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-servicios.html',
  styleUrl: './gestion-servicios.css',
})
// OnInit para que se incialicen apartados que definimos en ngOnInit()
export class GestionServicios implements OnInit {

  constructor(
    private cdr: ChangeDetectorRef,
    private servicioService: ServicioService,
  ) {} // detector de cambios

  @Output() serviciosCambiar = new EventEmitter<void>(); // envia cambios al panel (registrar habitacion)

  serviciosDisponibles: Servicios[] = [];
  nuevoServicio: string = '';

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarServicios(); // carga inicial de servicios
  }

  async cargarServicios() {
    this.serviciosDisponibles = await this.servicioService.obtenerServicios();
    this.cdr.detectChanges();
  }


  async guardarServicio() {
    if (!this.nuevoServicio.trim()) return;

    // Peticion HTTP POST
    await this.servicioService.guardarServicio(this.nuevoServicio.trim());

    // Limpia el campo de texto y recarga la lista
    this.nuevoServicio = '';
    await this.cargarServicios();
    this.serviciosCambiar.emit();
  }


  async eliminarServicio(id: number) {

    await this.servicioService.eliminarServicio(id);

    // reemplaza la lista antigua, por una nueva sin ese servicio
    this.serviciosDisponibles = this.serviciosDisponibles.filter(
      s => s.id !== id
    );
    
    this.cdr.detectChanges(); // Notifica cambios a Angular
    this.serviciosCambiar.emit();
  }
}
