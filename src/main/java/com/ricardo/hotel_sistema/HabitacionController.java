package com.ricardo.hotel_sistema;

import com.ricardo.hotel_sistema.modelo.Habitacion;
import com.ricardo.hotel_sistema.services.HabitacionServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/habitaciones")
public class HabitacionController {

    private HabitacionServices habitacionServicio;

    public HabitacionController(HabitacionServices habitacionServicio) {
        this.habitacionServicio = habitacionServicio;
    }

    @GetMapping
    public List<Habitacion> listar() {
        return habitacionServicio.listar();
    }

    @GetMapping("/{id}")
    public Habitacion buscarPorId(@PathVariable Long id) {
        return habitacionServicio.buscarHabitacionPorId(id);
    }

    @PostMapping
    public Habitacion guardar(@RequestBody Habitacion habitacion) {
        return habitacionServicio.guardar(habitacion);
    }

    @PutMapping("/{id}")
    public Habitacion actualizar(@PathVariable Long id, @RequestBody Habitacion nuevaHabitacion) {
        return habitacionServicio.actualizarHabitacion(id, nuevaHabitacion);
    }

    @DeleteMapping("/{id}")
    public Habitacion eliminar(@PathVariable Long id) {
        return habitacionServicio.eliminarHabitacion(id);
    }
}