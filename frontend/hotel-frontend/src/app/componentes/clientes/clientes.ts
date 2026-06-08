// importa Component, OnInit (ciclo de vida) y ChangeDetectorRef de Angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// importa CommonModule para ngClass, ngModel y ngValue
import { CommonModule } from '@angular/common';
// importa la interface Cliente desde el archivo de modelos
import { Cliente } from '../../models';
// importa la URL base de la API
import { API_BASE_URL } from '../../api.config';
// importa los nuevos subcomponentes
import { FormularioCliente } from './componentes/formulario-cliente/formulario-cliente';
import { TablaClientes } from './componentes/tabla-clientes/tabla-clientes';

// decorador que define el componente Clientes
@Component({
  selector: 'app-clientes',          // etiqueta HTML: <app-clientes>
  imports: [CommonModule, FormularioCliente, TablaClientes], // modulos necesarios
  templateUrl: './clientes.html',    // archivo de plantilla HTML
  styleUrl: './clientes.css'         // archivo de estilos CSS
})
// clase del componente Clientes que implementa OnInit
export class Clientes implements OnInit {
  // constructor que inyecta ChangeDetectorRef para deteccion manual de cambios
  constructor(private cdr: ChangeDetectorRef) {}

  // array que almacena la lista de clientes cargados
  clientes: Cliente[] = [];
  clientesBuscados: Cliente[] = [];

  // metodo del ciclo de vida: se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarClientes();     // carga los clientes desde el backend
  }

  // metodo async que obtiene la lista de clientes del backend
  async cargarClientes() {
    // peticion GET al endpoint de clientes
    const respuesta = await fetch(`${API_BASE_URL}/clientes`);
    // convierte la respuesta a JSON
    const datos = await respuesta.json();
    // asigna los datos al array de clientes
    this.clientes = datos;
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }

  async buscarClientes(name:string){
    //pido get al endoint de clientes
    const respuesta = await fetch(`${API_BASE_URL}/clientes/nombre/${name}`);
    this.clientesBuscados = await respuesta.json();
    this.cdr.detectChanges();
  }

  async eliminarCliente(idEliminar:number){
    await fetch(`${API_BASE_URL}/clientes/${idEliminar}`,
    {
      method: 'DELETE'
    });

    // esto actualiza la lista clientes, pero eliminando un cliente si su ID es "idEliminar"
    this.clientes = this.clientes.filter(
      cliente => cliente.id !== idEliminar
    );
    // lo mismo aca pero con la lista de clientesBuscados
    this.clientesBuscados = this.clientesBuscados.filter(
      clientesBuscado => clientesBuscado.id !== idEliminar
    )
    this.cdr.detectChanges();
  }

  // metodo async que guarda un nuevo cliente en el backend
  async guardarCliente(nuevoCliente: Cliente) {
    // peticion POST al endpoint de clientes
    const respuesta = await fetch(`${API_BASE_URL}/clientes`, {
      method: 'POST',                // metodo HTTP POST
      headers: {
        'Content-Type': 'application/json' // cabecera JSON
      },
      body: JSON.stringify(nuevoCliente) // cuerpo con datos del cliente
    });

    // convierte la respuesta a JSON (cliente guardado)
    const clienteGuardado = await respuesta.json();

    // agrega el nuevo cliente al array local
    this.clientes.push(clienteGuardado);
    // fuerza la deteccion de cambios de Angular
    this.cdr.detectChanges();
  }
}
