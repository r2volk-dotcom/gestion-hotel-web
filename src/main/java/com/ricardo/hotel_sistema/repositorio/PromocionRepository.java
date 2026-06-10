package com.ricardo.hotel_sistema.repositorio;

import com.ricardo.hotel_sistema.modelo.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// Repositorio JPA para la entidad Promocion
public interface PromocionRepository extends JpaRepository<Promocion, Long> {
    Optional<Promocion> findByActiva(boolean activa);
}
