import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pago } from '../../models';
import { PagoService } from './pago.service';
import { TablaPagos } from './tabla-pagos/tabla-pagos';
import { RegistroPagosModal } from './registro-pagos-modal/registro-pagos-modal';

@Component({
  selector: 'app-pagos',
  imports: [CommonModule,TablaPagos, RegistroPagosModal],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css',
})
export class Pagos implements OnInit{

  constructor(
    private pagoService: PagoService,
    private cdr: ChangeDetectorRef
  ) {}

  pagos: Pago[] = [];
  pagoSeleccionado: Pago | null = null;
  mostrarModal = false;

  async ngOnInit() {
    await this.cargarPagos();
  }

  async cargarPagos() {
    this.pagos = await this.pagoService.obtenerPagos();
    this.cdr.detectChanges();
  }

  abrirModal(pago: Pago) {
    this.pagoSeleccionado = pago;
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.pagoSeleccionado = null;
    this.cdr.detectChanges();
  }

  async confirmarPago(metodoPago: string) {
    if (!this.pagoSeleccionado?.id) {
      return;
    }
    await this.pagoService.confirmarPago(this.pagoSeleccionado.id, metodoPago);
    await this.cargarPagos();
    this.cerrarModal();
  }

  // Busca el cliente para poder mostrar su informacion real en la boleta
  async imprimirBoleta(pago: Pago) {
    try {
      // pedimos al servidor la reserva asociada a este pago usando su ID
      const respuestaReserva = await fetch(`http://localhost:8080/reservas/${pago.reservaId}`);
      const reserva = await respuestaReserva.json();
      
      // con el ID de cliente que nos dio la reserva, pedimos los datos de ese cliente
      const respuestaCliente = await fetch(`http://localhost:8080/clientes/id/${reserva.clienteId}`);
      const cliente = await respuestaCliente.json();
      
      const nombreCliente = `${cliente.nombre} ${cliente.apellido}`; //formateamos el nombre
      const dniCliente = cliente.dni || '—'; // si el cliente no tiene DNI, colocamos una rayita
      
      this.generarVentanaImpresion(pago, nombreCliente, dniCliente);
    } catch (e) {
      // Si algo falla creamos una boleta con datos genericos
      this.generarVentanaImpresion(pago, 'Cliente General', '—');
    }
  }

  generarVentanaImpresion(pago: Pago, cliente: string, dni: string) {
  
    const ventana = window.open('', '_blank'); // abrimos una ventana emergente vacia en el navegador
 
    if (!ventana) return; // si el navegador bloquea la ventana emergente, detenemos el proceso

    // escribimos directamente el diseño HTML y CSS dentro de la nueva pestaña
    ventana.document.write(`
      <html>
      <head>
        <title>Boleta de Venta - Pago #${pago.id}</title>
        <style>
          body {
            font-family: 'Courier New', Courier, monospace;
            padding: 30px;
            color: #000;
            background: #fff;
            max-width: 450px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px dashed #000;
            padding-bottom: 15px;
          }
          .hotel-title {
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          .subtitle {
            font-size: 13px;
            color: #555;
          }
          .section-title {
            text-align: center;
            font-size: 15px;
            font-weight: bold;
            margin: 15px 0;
            text-decoration: underline;
          }
          .details {
            margin-bottom: 25px;
            font-size: 14px;
            line-height: 1.6;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
          }
          .total-row {
            margin-top: 15px;
            font-size: 18px;
            font-weight: bold;
            border-top: 2px solid #000;
            padding-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            border-top: 2px dashed #000;
            padding-top: 15px;
            font-size: 12px;
          }
          .seal {
            border: 3px double #000;
            display: inline-block;
            padding: 5px 15px;
            font-weight: bold;
            font-size: 14px;
            margin-top: 15px;
            text-transform: uppercase;
          }
          @media print {
            body { padding: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="hotel-title">HOTEL ANTIGRAVEDAD</div>
          <div class="subtitle">Calle Principal 123, Lima - Perú</div>
          <div class="subtitle">RUC: 20123456789</div>
        </div>

        <div class="section-title">BOLETA DE VENTA ELECTRÓNICA</div>

        <div class="details">
          <div class="row"><strong>Boleta Nro:</strong> <span>B001-${String(pago.id).padStart(6, '0')}</span></div>
          <div class="row"><strong>Fecha de Pago:</strong> <span>${pago.fechaPago || '—'}</span></div>
          <div class="row"><strong>Reserva Asoc:</strong> <span>#${pago.reservaId}</span></div>
          <div class="row"><strong>Cliente:</strong> <span>${cliente}</span></div>
          <div class="row"><strong>DNI/RUC:</strong> <span>${dni}</span></div>
          <div class="row"><strong>Método Pago:</strong> <span>${pago.metodoPago || '—'}</span></div>
          
          <div class="row total-row">
            <strong>TOTAL PAGADO:</strong>
            <span>S/ ${(pago.monto || 0).toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <div class="seal">CANCELADO</div>
          <p style="margin-top: 15px;">¡Gracias por hospedarse con nosotros!</p>
          <p class="subtitle" style="margin-top: 5px;">Comprobante emitido de forma electrónica</p>
        </div>

        <script>
          // Cuando la pagina termine de cargar...
          window.onload = function() {
            // Abre el cuadro de dialogo de impresion del navegador (donde puedes elegir imprimir o Guardar como PDF)
            window.print();
            // Espera medio segundo (500 milisegundos) y cierra la pestaña del navegador de forma automatica
            setTimeout(function() { window.close(); }, 500);
          }
        </script>
      </body>
      </html>
    `);

    ventana.document.close(); // Cerramos el canal de escritura para indicarle a la pestaña que termine su carga
  }

}
