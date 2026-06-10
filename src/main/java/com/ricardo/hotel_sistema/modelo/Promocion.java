package com.ricardo.hotel_sistema.modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "promociones")
public class Promocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private double descuento; // Ej: 0.10 para 10%, 0.30 para 30%
    private boolean activa;

    // Constructor vacío necesario para JPA
    public Promocion() {}

    // Constructor completo
    public Promocion(Long id, String nombre, double descuento, boolean activa) {
        this.id = id;
        this.nombre = nombre;
        this.descuento = descuento;
        this.activa = activa;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

    public boolean isActiva() {
        return activa;
    }

    public void setActiva(boolean activa) {
        this.activa = activa;
    }
}
