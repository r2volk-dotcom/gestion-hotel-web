import { Component, OnInit,ChangeDetectorRef } from '@angular/core'; // angular
import { CommonModule } from '@angular/common'; // ngFor, ngIf
import { FormsModule } from '@angular/forms'; // ngModel
import { Cliente } from '../../models'; // interface

@Component({
  selector: 'app-clientes', // etiqueta <app-clientes>
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  // lista de clientes
  clientes: Cliente[] = [];

  // objeto del formulario
  nuevoCliente: Cliente = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    correo: ''
  };

  // se ejecuta al cargar el componente
  async ngOnInit() {
    await this.cargarClientes();
  }

  // pide clientes al backend
  async cargarClientes() {
    const respuesta = await fetch('http://localhost:8080/clientes');
    const datos = await respuesta.json();
    this.clientes = datos;
    this.cdr.detectChanges();
  }

  // guarda cliente en backend
  async guardarCliente() {

    // envia los datos al backend
    const respuesta = await fetch('http://localhost:8080/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // formato json
      },
      body: JSON.stringify(this.nuevoCliente)  // convierte objeto a json
    });

    const clienteGuardado = await respuesta.json(); // respuesta del backend

    this.clientes.push(clienteGuardado); // lo agrega a la lista

    // limpia formulario
    this.nuevoCliente = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      correo: ''
    };
    this.cdr.detectChanges();
  }
}
