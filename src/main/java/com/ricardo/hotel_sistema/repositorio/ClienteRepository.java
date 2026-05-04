package com.ricardo.hotel_sistema.repositorio;

import com.ricardo.hotel_sistema.modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository; //maneja la entidad habitacion con atajos en sql

import java.util.List;


//Repositorio JPA para la entidad Cliente con ID tipo Long (CRUD automático) JpaRepository<tabla,tipo de dato del id>
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findByNombre(String nombre);
    List<Cliente> findByNombreAndApellido(String nombre, String apellido);


}