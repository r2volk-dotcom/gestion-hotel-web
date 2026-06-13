import { Component, OnInit, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Promociones } from '../../../models';
import { API_BASE_URL } from '../../../api.config'; // URL base del backend

@Component({
  selector: 'app-gestion-promociones',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-promociones.html',
  styleUrl: './gestion-promociones.css',
})
// OnInit para que se incialicen apartados que definimos en ngOnInit()
export class GestionPromociones implements OnInit {

  constructor(private cdr: ChangeDetectorRef) {} // detector de cambios
  
  // Datos de salida para comunicarse con el padre
  @Output() promocionesCambiar = new EventEmitter<void>();
  @Output() TogglePromocion = new EventEmitter<number>();

  promocionesDisponibles: Promociones[] = [];
  nuevaPromocion: string = '';

  onTogglePromocion(id: number) {
    this.TogglePromocion.emit(id);
  }

  async cargarPromociones(){
    const respuesta = await fetch(`${API_BASE_URL}/promociones`);
    const datos = await respuesta.json();
    this.promocionesDisponibles = datos;
    this.cdr.detectChanges();
  }

  //Guarda nueva promocion en el servidor
  async guardarPromocion(){
    if (!this.nuevaPromocion.trim()) return;

    //Peticion HTTP POST
    await fetch(`${API_BASE_URL}/promociones`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: this.nuevaPromocion.trim(), descuento: 0.1, activa: false})
    });

    this.nuevaPromocion = '';
    await this.cargarPromociones();
  }

  async eliminarPromocion(id:number){
    await fetch(`${API_BASE_URL}/promociones/${id}`, {
      method: 'DELETE'
    });

    // reemplaza la lista antigua, por una nueva sin esa promocion
    this.promocionesDisponibles = this.promocionesDisponibles.filter(
      s => s.id != id
    );

    this.cdr.detectChanges();
  }
  
  async ngOnInit() {
   await this.cargarPromociones();
  }

  
}
