import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models';
import { ClienteService } from './cliente.service';
import { FormularioCliente } from './formulario-cliente/formulario-cliente';
import { TablaClientes } from './tabla-clientes/tabla-clientes';

@Component({
  selector: 'app-clientes', 
  imports: [CommonModule, FormularioCliente, TablaClientes], 
  templateUrl: './clientes.html',
  styleUrl: './clientes.css' 
})


// Componente principal para gestionar clientes
export class Clientes implements OnInit {

  constructor(
    private clienteService: ClienteService, // servicios
    private cdr: ChangeDetectorRef // detector de cambios
  ) {} 

  // Listas de clientes cargados y buscados
  clientes: Cliente[] = [];
  clientesBuscados: Cliente[] = [];

  // Se ejecuta al iniciar el componente
  async ngOnInit() {
    await this.cargarClientes(); // carga inicial de clientes
  }


  async cargarClientes() {
    // Carga todos los clientes desde el servidor
    this.clientes = await this.clienteService.obtenerClientes();
    this.cdr.detectChanges(); // Notifica cambios a Angular
  }


  async buscarClientes(name:string){
    // Busca clientes por nombre
    this.clientesBuscados = await this.clienteService.buscarClientes(name);
    this.cdr.detectChanges(); // Notifica cambios a Angular
  }


  async eliminarCliente(idEliminar:number){
    // Elimina un cliente por su ID
    await this.clienteService.eliminarCliente(idEliminar);

    // Remueve el cliente de la lista local
    this.clientes = this.clientes.filter(
      cliente => cliente.id !== idEliminar
    );
    // Remueve el cliente de la lista de busqueda
    this.clientesBuscados = this.clientesBuscados.filter(
      clientesBuscado => clientesBuscado.id !== idEliminar
    )
    
    this.cdr.detectChanges(); // Notifica cambios a Angular
  }


  async guardarCliente(nuevoCliente: Cliente) {
    // Guarda un nuevo cliente
    const clienteGuardado = await this.clienteService.guardarCliente(nuevoCliente);

    // Agrega el cliente a la lista local
    this.clientes.push(clienteGuardado);

    this.cdr.detectChanges(); // Notifica cambios a Angular
  }
}
