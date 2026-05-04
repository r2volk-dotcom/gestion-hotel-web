// importa Component, OnInit (ciclo de vida) y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// importa CommonModule para usar directivas como *ngIf y *ngFor
import { CommonModule } from '@angular/common';
// importa FormsModule para usar [(ngModel)] (two-way binding)
import { FormsModule } from '@angular/forms';
// importa la interface Cliente desde el archivo de modelos
import { Cliente } from '../../models';

// decorador que define el componente Clientes
@Component({
  selector: 'app-clientes',          // etiqueta HTML: <app-clientes>
  imports: [CommonModule, FormsModule], // modulos necesarios
  templateUrl: './clientes.html',    // archivo de plantilla HTML
  styleUrl: './clientes.css'         // archivo de estilos CSS
})
// clase del componente Clientes que implementa OnInit
export class Clientes implements OnInit {
  // constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  //nombre a buscar
  nombreBuscar: string = '';

  // array que almacena la lista de clientes cargados
  clientes: Cliente[] = [];
  clientesBuscados: Cliente[] = [];

  // objeto que representa el formulario de nuevo cliente
  nuevoCliente: Cliente = {
    nombre: '',                      // campo nombre vacio
    apellido: '',                    // campo apellido vacio
    dni: '',                         // campo DNI vacio
    telefono: '',                    // campo telefono vacio
    correo: ''                       // campo correo vacio
  };

  // metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarClientes();     // carga los clientes desde el backend
  }

  // metodo async que obtiene la lista de clientes del backend
  async cargarClientes() {
    // peticion GET al endpoint de clientes
    const respuesta = await fetch('http://localhost:8080/clientes');
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de clientes
    this.clientes = datos;
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

  async buscarClientes(name:string){
    //pido get al endoint de clientes
    const respuesta = await fetch(`http://localhost:8080/clientes/nombre/${name}`);
    this.clientesBuscados = await respuesta.json();
    this.cdr.detectChanges();
  }

  // metodo async que guarda un nuevo cliente en el backend
  async guardarCliente() {
    // peticion POST al endpoint de clientes
    const respuesta = await fetch('http://localhost:8080/clientes', {
      method: 'POST',                // metodo HTTP POST
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(this.nuevoCliente) // cuerpo con datos del cliente
    });

    // convierte la respuesta a JSON (cliente guardado)
    const clienteGuardado = await respuesta.json();

    // agrega el nuevo cliente al array local
    this.clientes.push(clienteGuardado);

    // reinicia el formulario con valores vacios
    this.nuevoCliente = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      correo: ''
    };
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }
}
