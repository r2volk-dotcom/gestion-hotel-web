import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../models';
import { EmpleadoService } from './empleado.service';
import { RegistroEmpleado } from './registro-empleado/registro-empleado';
import { TablaEmpleados } from './tabla-empleados/tabla-empleados';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, RegistroEmpleado, TablaEmpleados],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
// Componente contenedor para coordinar el registro y listado de empleados
export class Empleados implements OnInit {

  // Listado local de empleados
  empleados: Empleado[] = [];

  // Datos enlazados para registrar o editar un empleado
  empleadoForm: Empleado = {
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: '',
    rol: ''
  };

  // Estado de edicion para pasar al componente formulario
  editando: boolean = false;

  constructor(
    private empleadoService: EmpleadoService,
    private cdr: ChangeDetectorRef
  ) {}

  // Se ejecuta al cargar la pantalla
  async ngOnInit() {
    await this.cargarEmpleados();
  }

  // Consulta la lista de empleados al backend
  async cargarEmpleados() {
    this.empleados = await this.empleadoService.obtenerEmpleados();
    this.cdr.detectChanges();
  }

  // Guarda un empleado (creacion o edicion)
  async guardar(empleadoAGuardar: Empleado) {
    if (!empleadoAGuardar.nombre || !empleadoAGuardar.apellido || !empleadoAGuardar.usuario || !empleadoAGuardar.contrasena || !empleadoAGuardar.rol) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (this.editando && empleadoAGuardar.id) {
      // Peticion HTTP PUT para editar
      const actualizado = await this.empleadoService.actualizarEmpleado(empleadoAGuardar.id, empleadoAGuardar);
      this.empleados = this.empleados.map(e => e.id === actualizado.id ? actualizado : e);
      this.editando = false;
    } else {
      // Peticion HTTP POST para registrar
      const nuevo = await this.empleadoService.crearEmpleado(empleadoAGuardar);
      this.empleados.push(nuevo);
    }

    this.limpiarFormulario();
    this.cdr.detectChanges();
  }

  // Prepara los datos en el formulario para editar
  seleccionarParaEditar(empleadoAEditar: Empleado) {
    // Clonamos para evitar que cambios temporales en el input alteren la lista inmediatamente
    this.empleadoForm = { ...empleadoAEditar };
    this.editando = true;
    this.cdr.detectChanges();
  }

  // Elimina un empleado del backend y de la lista local
  async eliminar(id: number) {
    if (confirm('¿Estas seguro de eliminar a este empleado?')) {
      await this.empleadoService.eliminarEmpleado(id);
      this.empleados = this.empleados.filter(e => e.id !== id);
      this.cdr.detectChanges();
    }
  }

  // Limpia los campos y restablece el estado de edicion
  limpiarFormulario() {
    this.empleadoForm = {
      nombre: '',
      apellido: '',
      usuario: '',
      contrasena: '',
      rol: ''
    };
    this.editando = false;
    this.cdr.detectChanges();
  }
}
