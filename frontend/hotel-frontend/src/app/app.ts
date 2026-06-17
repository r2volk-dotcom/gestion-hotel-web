import { Component, OnInit, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { EmpleadoService } from './componentes/empleados/empleado.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  esLogin: boolean = false;
  esModoOscuro: boolean = false;
  
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private empleadoService: EmpleadoService
  ) {}
  
  // Obtiene el usuario logueado actualmente
  get usuarioActual() {
    return this.empleadoService.obtenerUsuarioActual();
  }

  // Genera las iniciales del usuario logueado
  obtenerIniciales(): string {
    const usuario = this.usuarioActual;
    if (!usuario) {
      return 'SH';
    }
    const nombreIni = usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : '';
    const apellidoIni = usuario.apellido ? usuario.apellido.charAt(0).toUpperCase() : '';
    return (nombreIni + apellidoIni) || 'SH';
  }

  // Cierra la sesion del usuario y redirige al login
  cerrarSesion() {
    this.empleadoService.cerrarSesion();
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    // 1. Obtener el estado del tema del localStorage
    this.esModoOscuro = localStorage.getItem('theme-dark-mode') === 'true';
    
    // 2. Aplicar el tema inicial
    this.applyTheme(this.esModoOscuro);
    
    // 3. Escuchar cambios de ruta para detectar si estamos en la pantalla de login
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes('/login') == true) {
          this.esLogin = true;
        } else {
          this.esLogin = false;
        }
      }
    });
  }
  
  // Función nativa para escuchar el cambio de switch de tema en el HTML
  onThemeChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.esModoOscuro = isChecked;
    this.applyTheme(isChecked);
    localStorage.setItem('theme-dark-mode', isChecked ? 'true' : 'false');
  }
  
  // Aplicar el tema oscuro o claro en el documento raíz
  applyTheme(isDarkMode: boolean) {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }
}
