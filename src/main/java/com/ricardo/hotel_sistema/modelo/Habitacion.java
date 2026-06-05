package com.ricardo.hotel_sistema.modelo;

//Anotaciones necesarias de JPA para mapear la clase a una BD
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    private String imagen;
    @ManyToMany
    @JoinTable(
            //tabla intermedia con 2 columas, habitacion_id y servicio_id
            name = "habitacion_servicio",
            joinColumns = @JoinColumn(name = "habitacion_id"),
            inverseJoinColumns = @JoinColumn(name = "servicio_id")
    )
    private List<Servicio> servicios = new ArrayList<>();

    //constructor vacio, necesario para el JPA
    public Habitacion() {
    }

    //constructor
    public Habitacion(Long id, String tipo, double precio, boolean disponible, String imagen, List<Servicio> servicios) {
        this.id = id;
        this.tipo = tipo;
        this.precio = precio;
        this.disponible = disponible;
        this.imagen = imagen;
        this.servicios = servicios;
    }

    //getters
    public Long getId() {
        return id;
    }

    public List<Servicio> getServicios() { return servicios; }

    public String getTipo() {
        return tipo;
    }

    public double getPrecio() {
        return precio;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public String getImagen() {return imagen;}

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

    public void setImagen(String imagen) {this.imagen = imagen;}

    public void setServicios(List<Servicio> servicios) { this.servicios = servicios; }
}