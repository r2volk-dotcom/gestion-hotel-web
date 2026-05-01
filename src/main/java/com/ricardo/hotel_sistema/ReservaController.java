package com.ricardo.hotel_sistema;

import com.ricardo.hotel_sistema.modelo.Reserva;
import com.ricardo.hotel_sistema.services.ReservaServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private ReservaServices reservaServices;

    public ReservaController(ReservaServices reservaServices) {
        this.reservaServices = reservaServices;
    }

    @GetMapping
    public List<Reserva> listar() {
        return reservaServices.listar();
    }

    @GetMapping("/{id}")
    public Reserva buscarPorId(@PathVariable Long id) {
        return reservaServices.buscarReservaPorId(id);
    }

    @PostMapping
    public Reserva guardar(@RequestBody Reserva reserva) {
        reserva.setEstado("RESERVADO");
        return reservaServices.guardar(reserva);
    }

    @PutMapping("/{id}")
    public Reserva actualizar(@PathVariable Long id, @RequestBody Reserva nuevaReserva) {
        return reservaServices.actualizarReserva(id, nuevaReserva);
    }

    @DeleteMapping("/{id}")
    public Reserva eliminar(@PathVariable Long id) {
        return reservaServices.eliminarReserva(id);
    }

    @PutMapping("/{id}/checkin")
    public Reserva hacerCheckin(@PathVariable Long id) {
        return reservaServices.hacerCheckIn(id);
    }

    @PutMapping("/{id}/checkout")
    public Reserva hacerCheckOut(@PathVariable Long id) {
        return reservaServices.hacerCheckOut(id);
    }

    @PutMapping("/{id}/cancelar")
    public Reserva cancelarReserva(@PathVariable Long id) {
        return reservaServices.cancelarReserva(id);
    }
}