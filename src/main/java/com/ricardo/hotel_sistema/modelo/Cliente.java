package com.ricardo.hotel_sistema.modelo;

//Anotaciones necesarias de JPA para mapear la clase a una BD
import jakarta.persistence.*;

@Entity // Indica que esta clase es una entidad, (se mapeará a una tabla en la BD)
@Table(name = "clientes") //especifica el nombre de la tabla
public class Cliente {

    @Id //indica que es la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indica que el ID se genera automaticamente

    private Long id;
    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String correo;

    //constructor vacio, necesario para el JPA
    public Cliente() {
    }

    public Cliente(Long id, String nombre, String apellido, String dni, String telefono, String correo){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.telefono = telefono;
        this.correo = correo;
    }

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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
}
