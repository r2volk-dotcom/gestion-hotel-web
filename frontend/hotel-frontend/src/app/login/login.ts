import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from '../componentes/empleados/empleado.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario: string = '';
  contrasena: string = '';
  cargando: boolean = false;
  error: string = '';
  mostrarContrasena: boolean = false;
  mostrarAlertaError: boolean = false; // Controla la visibilidad del modal de alerta

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  // Intenta ingresar al sistema
  async ingresar(): Promise<void> {
    const user = this.usuario.trim();
    const pass = this.contrasena.trim();

    if (user === '' || pass === '') {
      this.error = 'Por favor, completa todos los campos.';
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mostrarAlertaError = false;
    console.log('Componente Login: Iniciando proceso de ingreso para el usuario:', user);

    try {
      const empleado = await this.empleadoService.login(user, pass);
      console.log('Componente Login: Autenticacion exitosa en backend:', empleado);

      this.ngZone.run(() => {
        this.empleadoService.guardarSesion(empleado);
        this.router.navigate(['/habitaciones']);
      });
    } catch (err: any) {
      this.ngZone.run(() => {
        console.error('Componente Login: Capturado error en catch block:', err);
        this.cargando = false;
        this.mostrarAlertaError = true;
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  // Alterna la visibilidad de la contraseña
  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
