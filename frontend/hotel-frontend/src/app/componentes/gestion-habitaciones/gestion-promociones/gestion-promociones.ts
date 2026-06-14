import { Component, OnInit, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Promociones } from '../../../models';
import { PromocionService } from './promocion.service';


@Component({
  selector: 'app-gestion-promociones',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-promociones.html',
  styleUrl: './gestion-promociones.css',
})

// OnInit para que se incialicen apartados que definimos en ngOnInit()
export class GestionPromociones implements OnInit {

  constructor(
    private promocionService: PromocionService,
    private cdr: ChangeDetectorRef // detector de cambios
  ) {}
  
  // Datos de salida para comunicarse con el padre
  @Output() promocionesCambiar = new EventEmitter<void>();
  @Output() TogglePromocion = new EventEmitter<number>();

  promocionesDisponibles: Promociones[] = [];
  nuevaPromocion: string = '';

  onTogglePromocion(id: number) {
    this.TogglePromocion.emit(id);
  }

  async cargarPromociones() {
    this.promocionesDisponibles = await this.promocionService.obtenerPromociones();
    this.cdr.detectChanges();
  }


  // guarda una nueva promocion
  async guardarPromocion() {
    if (!this.nuevaPromocion.trim()) return;
    await this.promocionService.guardarPromocion(this.nuevaPromocion.trim());
    this.nuevaPromocion = '';
    await this.cargarPromociones();
    this.promocionesCambiar.emit();
  }


  async eliminarPromocion(id:number){
    await this.promocionService.eliminarPromocion(id);

    // reemplaza la lista antigua, por una nueva sin esa promocion
    this.promocionesDisponibles = this.promocionesDisponibles.filter(
      s => s.id != id
    );

    this.cdr.detectChanges();
    this.promocionesCambiar.emit(); // Emitimos cambio en promocion
  }
  
  
  async ngOnInit() {
   await this.cargarPromociones();
  }

  
}
