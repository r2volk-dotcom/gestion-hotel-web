import { Component, Input, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitacion } from '../../../../models';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-grafico-habitaciones',
  imports: [CommonModule],
  templateUrl: './grafico-habitaciones.html',
  styleUrl: './grafico-habitaciones.css',
})
export class GraficoHabitaciones implements OnChanges, OnInit, OnDestroy {
  @Input() habitaciones: Habitacion[] = [];

  chartInstance: any = null;
  observerTema: MutationObserver | null = null;

  ngOnInit() {
    this.suscribirseACambiosTema();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['habitaciones']) {
      this.renderizarGrafico();
    }
  }

  ngOnDestroy() {
    if (this.observerTema) {
      this.observerTema.disconnect();
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  obtenerDatosGrafico() {
    const conteos: { [key: string]: number } = {};
    
    // Lista ordenada de tipos para consistencia visual en el gráfico
    const tiposOrdenados = ['Individual', 'Doble', 'Twin', 'Triple', 'Cuadruple', 'Deluxe', 'Suite'];
    tiposOrdenados.forEach(t => conteos[t] = 0);

    this.habitaciones.forEach(h => {
      if (h.tipo) {
        conteos[h.tipo] = (conteos[h.tipo] || 0) + 1;
      }
    });

    // Filtrar los tipos que no tienen habitaciones para no saturar el gráfico
    const labels = Object.keys(conteos).filter(tipo => conteos[tipo] > 0);
    const values = labels.map(tipo => conteos[tipo]);

    return { labels, values };
  }

  renderizarGrafico() {
    setTimeout(() => {
      const ctx = document.getElementById('habitacionesChart') as HTMLCanvasElement;
      if (!ctx) return;

      const datos = this.obtenerDatosGrafico();

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Colores adaptables al tema claro y oscuro
      const textColor = isDark ? '#a1a1aa' : '#71717a';
      const gridColor = isDark ? '#27272a' : '#eeeeef';
      const barColor = isDark ? '#fafafa' : '#18181b';
      const barHoverColor = isDark ? '#ffffff' : '#000000';
      const tooltipBg = isDark ? '#27272a' : '#09090b';
      const tooltipBorder = isDark ? '#3f3f46' : '#27272a';

      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: datos.labels,
          datasets: [{
            label: 'Habitaciones',
            data: datos.values,
            backgroundColor: barColor,
            hoverBackgroundColor: barHoverColor,
            borderRadius: 17,
            borderSkipped: false,
            barPercentage: 0.80,
            categoryPercentage: 0.85,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 500,
            easing: 'easeOutQuart'
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: tooltipBg,
              titleColor: '#ffffff',
              bodyColor: '#d4d4d8',
              borderColor: tooltipBorder,
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              displayColors: false,
              callbacks: {
                label: (context) => ` ${context.parsed.y} habitación(es)`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: {
                color: textColor,
                font: { family: "'Geist', sans-serif", size: 10, weight: 'normal' }
              }
            },
            y: {
              beginAtZero: true,
              grid: { color: gridColor },
              border: { display: false },
              ticks: {
                color: textColor,
                font: { family: "'Geist', sans-serif", size: 10 },
                stepSize: 1
              }
            }
          }
        }
      });
    }, 0);
  }

  suscribirseACambiosTema() {
    this.observerTema = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          this.renderizarGrafico();
        }
      });
    });

    this.observerTema.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }
}
