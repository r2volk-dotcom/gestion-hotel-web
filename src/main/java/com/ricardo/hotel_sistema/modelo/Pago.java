package com.ricardo.hotel_sistema.modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long reservaId;
    private Double monto;
    private String metodoPago; // "Efectivo", "Tarjeta de Crédito", etc.
    private String estado;     // "Pendiente" | "Pagado"
    private LocalDate fechaPago;

    public Pago() {}

    public Pago(Long reservaId, Double monto, String metodoPago, String estado, LocalDate fechaPago) {
        this.reservaId = reservaId;
        this.monto = monto;
        this.estado = estado;
        this.metodoPago = metodoPago;
        this.fechaPago = fechaPago;
    }

    public LocalDate getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(LocalDate fechaPago) {
        this.fechaPago = fechaPago;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Long getReservaId() {
        return reservaId;
    }

    public void setReservaId(Long reservaId) {
        this.reservaId = reservaId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
