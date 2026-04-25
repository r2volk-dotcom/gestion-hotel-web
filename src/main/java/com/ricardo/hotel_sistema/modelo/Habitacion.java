package com.ricardo.hotel_sistema.modelo;

//Anotaciones necesarias de JPA para mapear la clase a una BD
import jakarta.persistence.*;

@Entity // Indica que esta clase es una entidad, (se mapeará a una tabla en la BD)
@Table(name = "habitaciones") //especifica el nombre de la tabla
public class Habitacion {

    @Id //indica que es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indica que el ID se genera automaticamente

    //Variables
    private Long id;
    private String tipo;
    private double precio;
    private boolean disponible;

    //constructor vacio, necesario para el JPA
    public Habitacion() {
    }

    //constructor
    public Habitacion(Long id, String tipo, double precio, boolean disponible) {
        this.id = id;
        this.tipo = tipo;
        this.precio = precio;
        this.disponible = disponible;
    }

    //getters
    public Long getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    public double getPrecio() {
        return precio;
    }

    public boolean isDisponible() {
        return disponible;
    }

    //setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }
}