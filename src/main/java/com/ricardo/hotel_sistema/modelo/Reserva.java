package com.ricardo.hotel_sistema.modelo;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clienteId;
    private Long habitacionId;
    private Long empleadoId; // ID del empleado que realizó/editó la reserva
    private LocalDate fechaEntrada;
    private LocalDate fechaSalida;
    private String estado;

    // Campos de snapshot financiero e histórico
    private Double precioPorNoche;
    private Double precioTotal;
    private String promocionAplicada;

    public Reserva() {
    }

    public Reserva(Long id, Long clienteId, Long habitacionId, Long empleadoId, LocalDate fechaEntrada, LocalDate fechaSalida, String estado, Double precioPorNoche, Double precioTotal, String promocionAplicada) {
        this.id = id;
        this.clienteId = clienteId;
        this.habitacionId = habitacionId;
        this.empleadoId = empleadoId;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.estado = estado;
        this.precioPorNoche = precioPorNoche;
        this.precioTotal = precioTotal;
        this.promocionAplicada = promocionAplicada;
    }

    public Long getId() {
        return id;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public Long getHabitacionId() {
        return habitacionId;
    }

    public LocalDate getFechaEntrada() {
        return fechaEntrada;
    }

    public LocalDate getFechaSalida() {
        return fechaSalida;
    }

    public String getEstado() {
        return estado;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public void setHabitacionId(Long habitacionId) {
        this.habitacionId = habitacionId;
    }

    public void setFechaEntrada(LocalDate fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public void setFechaSalida(LocalDate fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Long getEmpleadoId() {
        return empleadoId;
    }

    public void setEmpleadoId(Long empleadoId) {
        this.empleadoId = empleadoId;
    }

    public Double getPrecioPorNoche() {
        return precioPorNoche;
    }

    public void setPrecioPorNoche(Double precioPorNoche) {
        this.precioPorNoche = precioPorNoche;
    }

    public Double getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(Double precioTotal) {
        this.precioTotal = precioTotal;
    }

    public String getPromocionAplicada() {
        return promocionAplicada;
    }

    public void setPromocionAplicada(String promocionAplicada) {
        this.promocionAplicada = promocionAplicada;
    }
}