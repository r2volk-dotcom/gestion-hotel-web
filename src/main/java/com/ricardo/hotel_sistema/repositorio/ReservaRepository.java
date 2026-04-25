package com.ricardo.hotel_sistema.repositorio;

import com.ricardo.hotel_sistema.modelo.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

//Repositorio JPA para Reserva (CRUD automático)
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

}