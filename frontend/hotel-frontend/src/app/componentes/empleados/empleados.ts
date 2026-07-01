import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../models';
import { EmpleadoService } from './empleado.service';
import { RegistroEmpleado } from './registro-empleado/registro-empleado';
import { TablaEmpleados } from './tabla-empleados/tabla-empleados';
import { FotosEmpleados } from './fotos-empleados/fotos-empleados';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, RegistroEmpleado, TablaEmpleados,FotosEmpleados],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
// Componente contenedor para coordinar el registro y listado de empleados
export class Empleados implements OnInit {

  // Listado local de empleados
  empleados: Empleado[] = [];
  nombreImagen: string = '';

  // Datos enlazados para registrar o editar un empleado
  empleadoForm: Empleado = {
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: '',
    rol: '',
    imagen: ''
  };

  // Estado de edicion para pasar al componente formulario
  editando: boolean = false;
  imagenOriginalEdicion: string = '';

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

  alSeleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    // Valida que el formato sea PNG
    if (archivo.type !== 'image/png') {
      alert('Solo se permiten archivos PNG');
      return;
    }

    // Valida tamaño maximo
    if (archivo.size > 3145728) {
      alert('La imagen no debe superar 3MB');
      return;
    }

    // Lector de archivos para conversion
    const lector = new FileReader();
    lector.onload = () => {
      this.empleadoForm.imagen = lector.result as string;
      this.nombreImagen = archivo.name;
      this.cdr.detectChanges();
    };
    lector.readAsDataURL(archivo);
  }

  // Guarda un empleado (creacion o edicion)
  async guardar(empleadoAGuardar: Empleado) {
    if (!empleadoAGuardar.nombre || !empleadoAGuardar.apellido || !empleadoAGuardar.usuario || !empleadoAGuardar.contrasena || !empleadoAGuardar.rol) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (this.editando && empleadoAGuardar.id) {
      // Peticion HTTP PUT para editar
      if (!empleadoAGuardar.imagen) {
        empleadoAGuardar.imagen = this.imagenOriginalEdicion;
      }
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
    this.imagenOriginalEdicion = empleadoAEditar.imagen || '';
    this.nombreImagen = empleadoAEditar.imagen ? 'imagen_guardada.png' : '';
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
      rol: '',
      imagen: ''
    };
    this.nombreImagen = '';
    this.editando = false;
    this.cdr.detectChanges();
  }
}
