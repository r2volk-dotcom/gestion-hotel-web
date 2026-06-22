package com.ricardo.hotel_sistema.repositorio;

import com.ricardo.hotel_sistema.modelo.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


public interface PagoRepository extends JpaRepository<Pago, Long> {

    // Buscar un pago por el ID de la reserva
    Optional<Pago> findByReservaId(Long reservaId);

    // Eliminar un pago por el ID de la reserva
    // @Transactional es obligatorio para que Spring Boot tenga permiso de borrar registros de la base de datos sin lanzar errores.
    @Transactional
    void deleteByReservaId(Long reservaId);
}
