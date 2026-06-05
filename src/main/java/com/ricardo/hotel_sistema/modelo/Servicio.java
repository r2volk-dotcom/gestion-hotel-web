package com.ricardo.hotel_sistema.modelo;

import jakarta.persistence.*;

@Entity // Indica que esta clase es una entidad, (se mapeará a una tabla en la BD)
@Table(name = "servicios") //especifica el nombre de la tabla
public class Servicio {

    @Id //indica que es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String nombre;

    public Servicio() {}

    public Servicio(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
