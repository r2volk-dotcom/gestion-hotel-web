import { Component, Input } from '@angular/core';
import { Empleado } from '../../../models';

@Component({
  selector: 'app-fotos-empleados',
  imports: [],
  templateUrl: './fotos-empleados.html',
  styleUrl: './fotos-empleados.css',
})

export class FotosEmpleados {

  @Input() empleados: Empleado[] = []; // Lista de empleados recibida del padre


}
