import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Habitacion, Servicios } from '../../models';
import { GestionServicios } from '../gestion-servicios/gestion-servicios';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-gestion-habitaciones',
  imports: [CommonModule, FormsModule, GestionServicios],
  templateUrl: './gestion-habitaciones.html',
  styleUrl: './gestion-habitaciones.css',
})
export class GestionHabitaciones implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  habitaciones: Habitacion[] = [];
  
  serviciosDisponibles: Servicios[] = [];
  serviciosSeleccionados: number[] = [];

  nombreImagen: string = '';
  
  nuevaHabitacion: Habitacion = {
    tipo: '',                        
    precio: 0,                       
    disponible: true,
    imagen:'',
    servicios: []      
  };

  chartInstance: any = null;
  observerTema: MutationObserver | null = null;

  async ngOnInit() {
    await this.cargarHabitaciones();
    await this.cargarServicios(); 
    this.suscribirseACambiosTema();
  }

  ngOnDestroy() {
    if (this.observerTema) {
      this.observerTema.disconnect();
    }
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  async cargarHabitaciones() {
    const respuesta = await fetch('http://localhost:8080/habitaciones');
    const datos = await respuesta.json();
    this.habitaciones = datos;
    this.cdr.detectChanges();
    this.renderizarGrafico();
  }

  async cargarServicios() {
    const respuesta = await fetch('http://localhost:8080/servicios');
    const datos = await respuesta.json();
    this.serviciosDisponibles = datos;
    this.cdr.detectChanges();
  }

  obtenerImagen(habitacion: Habitacion): string {
    return habitacion.imagen || '';
  }

  async eliminarHabitacion(idEliminar:number){
    await fetch(`http://localhost:8080/habitaciones/${idEliminar}`,
    {
      method: 'DELETE'
    });

    this.habitaciones = this.habitaciones.filter(
      cliente => cliente.id !== idEliminar
    );
    this.cdr.detectChanges();
    this.renderizarGrafico();
  }

  toggleServicio(id: number) {
    const indice = this.serviciosSeleccionados.indexOf(id);
    if (indice === -1) {
        this.serviciosSeleccionados.push(id);
    } else {
        this.serviciosSeleccionados.splice(indice, 1);
    }
  }

  alSeleccionarImagen(event: any) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    if (archivo.type !== 'image/png') {
      alert('Solo se permiten archivos PNG');
      return;
    }

    if (archivo.size > 1048576) {
      alert('La imagen no debe superar 1MB');
      return;
    }

    const lector = new FileReader();
    lector.onload = () => {
      this.nuevaHabitacion.imagen = lector.result as string;
      this.nombreImagen = archivo.name;
      this.cdr.detectChanges();
    };
    lector.readAsDataURL(archivo);
  }

  async guardarHabitacion() {
    this.nuevaHabitacion.servicios = this.serviciosSeleccionados.map(id => {
      return { id: id } as Servicios;
    });

    const respuesta = await fetch('http://localhost:8080/habitaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.nuevaHabitacion)
    });

    const habitacionGuardada = await respuesta.json();
    this.habitaciones.push(habitacionGuardada);

    this.nuevaHabitacion = {
      tipo: '',
      precio: 0,
      disponible: true,
      imagen:'' 
    };

    this.serviciosSeleccionados = [];
    this.nombreImagen = '';

    this.cdr.detectChanges();
    this.renderizarGrafico();
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
            borderRadius: 6,
            borderSkipped: false,
            barPercentage: 0.55,
            categoryPercentage: 0.75,
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
