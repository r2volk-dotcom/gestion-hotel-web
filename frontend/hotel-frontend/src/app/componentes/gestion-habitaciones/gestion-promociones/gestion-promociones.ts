// Importa Component, Input, Output, EventEmitter y ElementRef de Angular
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
// Importa CommonModule para directivas basicas
import { CommonModule } from '@angular/common';
// Importa FormsModule para formularios
import { FormsModule } from '@angular/forms';
// Importa interfaz de Promociones
import { Promociones } from '../../../models';
// Importa la URL base del backend
import { API_BASE_URL } from '../../../api.config';

// Decorador del componente
@Component({
  selector: 'app-gestion-promociones', // selector HTML
  imports: [CommonModule, FormsModule], // modulos importados
  templateUrl: './gestion-promociones.html', // plantilla HTML
  styleUrl: './gestion-promociones.css', // archivo de estilos
})
// Componente de gestion de promociones (proximamente)
export class GestionPromociones {
  
}
