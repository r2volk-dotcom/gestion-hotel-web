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
  descuentoPromocion: number | null = null;

  async onTogglePromocion(id: number) {
    const promo = this.promocionesDisponibles.find(p => p.id === id);
    if (!promo) return;

    if (promo.activa) {
      // Si ya estaba activa se desactivan todas
      await this.promocionService.desactivarTodas();
    } else {
      // Si estaba inactiva la activamos
      await this.promocionService.activarPromocion(id);
    }

    // Recarga la lista de promociones
    await this.cargarPromociones();
    // Emite el cambio
    this.promocionesCambiar.emit();
  }

  async cargarPromociones() {
    this.promocionesDisponibles = await this.promocionService.obtenerPromociones();
    this.cdr.detectChanges();
  }


  // guarda una nueva promocion
  async guardarPromocion() {
    if (!this.nuevaPromocion.trim()) return;
    const descuento = this.descuentoPromocion !== null ? this.descuentoPromocion : 0;
    await this.promocionService.guardarPromocion(this.nuevaPromocion.trim(), descuento / 100);
    this.nuevaPromocion = '';
    this.descuentoPromocion = null;
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
