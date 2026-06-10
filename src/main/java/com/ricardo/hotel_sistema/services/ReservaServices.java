package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Reserva;
import com.ricardo.hotel_sistema.modelo.Habitacion;
import com.ricardo.hotel_sistema.modelo.Promocion;
import com.ricardo.hotel_sistema.repositorio.ReservaRepository;
import com.ricardo.hotel_sistema.repositorio.HabitacionRepository;
import com.ricardo.hotel_sistema.repositorio.PromocionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaServices {

    private final ReservaRepository reservaRepository;
    private final HabitacionRepository habitacionRepository;
    private final PromocionRepository promocionRepository;

    // constructor
    public ReservaServices(ReservaRepository reservaRepository, HabitacionRepository habitacionRepository, PromocionRepository promocionRepository) {
        this.reservaRepository = reservaRepository;
        this.habitacionRepository = habitacionRepository;
        this.promocionRepository = promocionRepository;
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
        calcularValoresFinancieros(reserva);
        return reservaRepository.save(reserva);
    }

    //actualizar reserva
    public Reserva actualizarReserva(Long id, Reserva nuevaReserva) {

        Optional<Reserva> reservaExistente = reservaRepository.findById(id);

        if (reservaExistente.isPresent()) {

            Reserva r = reservaExistente.get();

            r.setClienteId(nuevaReserva.getClienteId());
            r.setHabitacionId(nuevaReserva.getHabitacionId());
            r.setEmpleadoId(nuevaReserva.getEmpleadoId());
            r.setFechaEntrada(nuevaReserva.getFechaEntrada());
            r.setFechaSalida(nuevaReserva.getFechaSalida());
            r.setEstado(nuevaReserva.getEstado());

            // Recalcular valores financieros
            calcularValoresFinancieros(r);

            return reservaRepository.save(r);
        }

        return null;
    }

    private void calcularValoresFinancieros(Reserva reserva) {
        // Buscar la habitación asociada para obtener el precio actual
        Habitacion habitacion = habitacionRepository.findById(reserva.getHabitacionId()).orElse(null);
        if (habitacion == null) return;

        // Calcular noches restando los días de cada fecha
        long noches = reserva.getFechaSalida().toEpochDay() - reserva.getFechaEntrada().toEpochDay();
        if (noches <= 0) {
            noches = 1; // Por seguridad, al menos 1 noche
        }

        double precioNoche = habitacion.getPrecio();
        double descuento = 0.0;
        String nombrePromo = "Sin Promociones";

        // Buscar si hay una promoción activa
        Promocion promoActiva = promocionRepository.findByActiva(true).orElse(null);
        if (promoActiva != null) {
            descuento = promoActiva.getDescuento();
            nombrePromo = promoActiva.getNombre();
        }

        // Calcular el precio total final
        double total = (precioNoche * noches) * (1 - descuento);

        // Guardar datos en la reserva
        reserva.setPrecioPorNoche(precioNoche);
        reserva.setPrecioTotal(total);
        reserva.setPromocionAplicada(nombrePromo);
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

    //metodo para registrar check-in de una reserva
    public Reserva hacerCheckIn(Long id) {

        Optional<Reserva> reservaExistente = reservaRepository.findById(id);

        if (reservaExistente.isPresent()) {
            Reserva r = reservaExistente.get();
            r.setEstado("CheckIn");

            return reservaRepository.save(r);
        }
        return null;
    }

    //metodo para registrar check-out de una reserva
    public Reserva hacerCheckOut(Long id) {

        Optional<Reserva> reservaExistente = reservaRepository.findById(id);

        if (reservaExistente.isPresent()) {
            Reserva r = reservaExistente.get();
            r.setEstado("CheckOut");

            return reservaRepository.save(r);
        }
        return null;
    }

    //metodo para registrar "cancelar" de una reserva
    public Reserva cancelarReserva(Long id) {

        Optional<Reserva> reservaExistente = reservaRepository.findById(id);

        if (reservaExistente.isPresent()) {
            Reserva r = reservaExistente.get();
            r.setEstado("Cancelado");

            return reservaRepository.save(r);
        }
        return null;
    }
}