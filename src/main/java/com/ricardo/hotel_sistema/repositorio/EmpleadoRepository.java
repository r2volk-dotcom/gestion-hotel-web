package com.ricardo.hotel_sistema.repositorio;

import com.ricardo.hotel_sistema.modelo.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repositorio JPA para la entidad Empleado
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Empleado> findByUsuario(String usuario);
}
