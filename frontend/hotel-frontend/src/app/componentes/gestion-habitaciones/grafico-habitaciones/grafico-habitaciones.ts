// Importa modulos de ciclo de vida de Angular
import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
// Importa modulo comun
import { CommonModule } from '@angular/common';
// Importa interfaz de Habitacion
import { Habitacion } from '../../../models';
// Importa libreria Chart para graficos
import { Chart } from 'chart.js/auto';

// Decorador del componente
@Component({
  selector: 'app-grafico-habitaciones', // selector HTML
  imports: [CommonModule], // componentes importados
  templateUrl: './grafico-habitaciones.html', // plantilla HTML
  styleUrl: './grafico-habitaciones.css', // archivo de estilos
})
// Componente del grafico de habitaciones por tipo
export class GraficoHabitaciones implements OnChanges, OnInit, OnDestroy {
  // Lista de habitaciones
  @Input() habitaciones: Habitacion[] = [];

  // Instancia de la libreria Chart
  chartInstance: any = null;
  // Observador de cambios del tema
  observerTema: MutationObserver | null = null;

  // Inicializa el componente
  ngOnInit() {
    this.suscribirseACambiosTema(); // escucha cambios en el tema de la aplicacion
  }

  // Detecta cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges) {
    // Si cambia la lista de habitaciones, vuelve a pintar el grafico
    if (changes['habitaciones']) {
      this.renderizarGrafico();
    }
  }

  // Destruye el componente y limpia observadores
  ngOnDestroy() {
    // Desconecta observador de temas
    if (this.observerTema) {
      this.observerTema.disconnect();
    }
    // Destruye instancia de Chart
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  // Obtiene los datos agrupados para el grafico
  obtenerDatosGrafico() {
    // Mapeo temporal de conteos
    const conteos: { [key: string]: number } = {};
    
    // Lista ordenada de tipos para consistencia visual en el grafico
    const tiposOrdenados = ['Simple', 'Doble', 'Matrimonial', 'Suite', 'Familiar', 'Deluxe', 'Ejecutiva', 'Presidencial'];
    // Inicializa cada tipo en cero
    tiposOrdenados.forEach(t => conteos[t] = 0);

    // Suma la cantidad de habitaciones por cada tipo
    this.habitaciones.forEach(h => {
      if (h.tipo) {
        conteos[h.tipo] = (conteos[h.tipo] || 0) + 1;
      }
    });

    // Filtrar los tipos que no tienen habitaciones para no saturar el grafico
    const labels = Object.keys(conteos).filter(tipo => conteos[tipo] > 0);
    // Obtiene valores de los tipos filtrados
    const values = labels.map(tipo => conteos[tipo]);

    // Retorna etiquetas y valores
    return { labels, values };
  }

  // Renderiza o actualiza el grafico de barras
  renderizarGrafico() {
    // Retrasa ejecucion para asegurar que el canvas este listo
    setTimeout(() => {
      // Obtiene canvas del HTML
      const ctx = document.getElementById('habitacionesChart') as HTMLCanvasElement;
      // Si no existe, cancela proceso
      if (!ctx) return;

      // Obtiene datos formateados para Chart
      const datos = this.obtenerDatosGrafico();

      // Destruye grafico existente antes de crear uno nuevo
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // Valida si el tema actual es oscuro
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Colores adaptables al tema claro y oscuro
      const textColor = isDark ? '#a1a1aa' : '#71717a'; // color de texto
      const gridColor = isDark ? '#27272a' : '#eeeeef'; // color de cuadricula
      const barColor = isDark ? '#fafafa' : '#18181b'; // color de barras
      const barHoverColor = isDark ? '#ffffff' : '#000000'; // color al pasar cursor
      const tooltipBg = isDark ? '#27272a' : '#09090b'; // fondo del tooltip
      const tooltipBorder = isDark ? '#3f3f46' : '#27272a'; // borde del tooltip

      // Crea nueva instancia de Chart
      this.chartInstance = new Chart(ctx, {
        type: 'bar', // tipo de grafico
        data: {
          labels: datos.labels, // etiquetas en el eje X
          datasets: [{
            label: 'Habitaciones', // etiqueta principal
            data: datos.values, // valores en el eje Y
            backgroundColor: barColor, // fondo de barras
            hoverBackgroundColor: barHoverColor, // fondo al pasar cursor
            borderRadius: 17, // esquinas redondeadas
            borderSkipped: false, // dibuja borde superior
            barPercentage: 0.80, // ancho relativo de barras
            categoryPercentage: 0.85, // ancho de categoria
          }]
        },
        options: {
          responsive: true, // adapta tamano al contenedor
          maintainAspectRatio: false, // permite redimension libre
          animation: {
            duration: 500, // duracion de animacion
            easing: 'easeOutQuart' // efecto de suavizado
          },
          plugins: {
            legend: { display: false }, // oculta leyenda
            tooltip: {
              backgroundColor: tooltipBg, // color de fondo
              titleColor: '#ffffff', // color del titulo
              bodyColor: '#d4d4d8', // color del cuerpo
              borderColor: tooltipBorder, // color del borde
              borderWidth: 1, // grosor del borde
              padding: 10, // espaciado interno
              cornerRadius: 8, // esquinas redondeadas
              displayColors: false, // oculta caja de color
              callbacks: {
                // Personaliza etiqueta de datos en tooltip
                label: (context) => ` ${context.parsed.y} habitación(es)`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false }, // oculta cuadricula
              border: { display: false }, // oculta linea del eje
              ticks: {
                color: textColor, // color de etiquetas
                font: { family: "'Geist', sans-serif", size: 10, weight: 'normal' } // tipografia
              }
            },
            y: {
              beginAtZero: true, // inicia escala en cero
              grid: { color: gridColor }, // color de lineas horizontales
              border: { display: false }, // oculta linea del eje
              ticks: {
                color: textColor, // color de etiquetas
                font: { family: "'Geist', sans-serif", size: 10 }, // tipografia
                stepSize: 1 // pasos enteros
              }
            }
          }
        }
      });
    }, 0);
  }

  // Observa cambios en el tema de la aplicacion para repintar
  suscribirseACambiosTema() {
    // Configura observador de mutaciones del HTML
    this.observerTema = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Si cambia el atributo de tema, renderiza de nuevo
        if (mutation.attributeName === 'data-theme') {
          this.renderizarGrafico();
        }
      });
    });

    // Observa el elemento root del documento
    this.observerTema.observe(document.documentElement, {
      attributes: true, // vigila atributos
      attributeFilter: ['data-theme'] // filtra atributo de tema
    });
  }
}
