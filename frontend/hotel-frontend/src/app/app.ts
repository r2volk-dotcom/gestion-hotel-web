// importa el decorador Component desde Angular
import { Component, OnInit, ElementRef } from '@angular/core';
// importa modulos de enrutamiento: RouterOutlet, RouterLink, RouterLinkActive
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// decorador que define el componente principal de la app
@Component({
  selector: 'app-root',              // etiqueta HTML para usar este componente
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // modulos necesarios
  templateUrl: './app.html',         // archivo de plantilla HTML
  styleUrl: './app.css'              // archivo de estilos CSS
})
// clase principal del componente de la aplicacion
export class App implements OnInit {
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit() {
    // Obtener el estado del tema del localStorage
    const isDarkMode = localStorage.getItem('theme-dark-mode') === 'true';
    
    // Establecer el estado inicial del checkbox
    const toggle = this.elementRef.nativeElement.querySelector('#theme-toggle') as HTMLInputElement;
    if (toggle) {
      toggle.checked = isDarkMode;
      this.applyTheme(isDarkMode);
    }
    
    // Escuchar cambios en el toggle
    if (toggle) {
      toggle.addEventListener('change', (event: Event) => {
        const isChecked = (event.target as HTMLInputElement).checked;
        this.applyTheme(isChecked);
        localStorage.setItem('theme-dark-mode', isChecked ? 'true' : 'false');
      });
    }
  }
  
  // Aplicar el tema oscuro o claro
  applyTheme(isDarkMode: boolean) {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }
}
