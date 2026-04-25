package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Reserva;
import com.ricardo.hotel_sistema.repositorio.ReservaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaServices {

    //Repositorio que consulta la BD
    private ReservaRepository reservaRepository;

    //constructor
    public ReservaServices(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    //listar reservas
    public List<Reserva> listar() {
        return reservaRepository.findAll();
    }

    //buscar reserva por id
    public Reserva buscarReservaPorId(Long id) {

        Optional<Reserva> reserva = reservaRepository.findById(id);

        return reserva.orElse(null);
    }

    //guardar reserva
    public Reserva guardar(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    //actualizar reserva
    public Reserva actualizarReserva(Long id, Reserva nuevaReserva) {

        Optional<Reserva> reservaExistente = reservaRepository.findById(id);

        if (reservaExistente.isPresent()) {

            Reserva r = reservaExistente.get();

            r.setClienteId(nuevaReserva.getClienteId());
            r.setHabitacionId(nuevaReserva.getHabitacionId());
            r.setFechaEntrada(nuevaReserva.getFechaEntrada());
            r.setFechaSalida(nuevaReserva.getFechaSalida());
            r.setEstado(nuevaReserva.getEstado());

            return reservaRepository.save(r);
        }

        return null;
    }

    //eliminar reserva
    public Reserva eliminarReserva(Long id) {

        Optional<Reserva> reserva = reservaRepository.findById(id);

        if (reserva.isPresent()) {
            reservaRepository.deleteById(id);
            return reserva.get();
        }

        return null;
    }
}