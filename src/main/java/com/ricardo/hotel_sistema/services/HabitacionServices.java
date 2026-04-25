package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Habitacion;
import com.ricardo.hotel_sistema.repositorio.HabitacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class HabitacionServices {

    //variable HabitacionRepository que sabe como consultar la BD
    private HabitacionRepository habitacionRepository;

    //constructor
    public HabitacionServices(HabitacionRepository habitacionRepository) {
        this.habitacionRepository = habitacionRepository;
    }

    //metodo para mostrar la lista de habitaciones
    public List<Habitacion> listar() {
        return habitacionRepository.findAll();
    }

    //metodo para buscar una habitacion por ID
    public Habitacion buscarHabitacionPorId(Long id) {
        //variable opcional, porque no sabemos si exite o no
        Optional<Habitacion> habitacion = habitacionRepository.findById(id);
        // si existe la devuelve, si no existe, retorna null
        return habitacion.orElse(null);
    }

    //metodo para guardar una habitacion a la lista de habitaciones
    public Habitacion guardar(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    //metodo para actualizar habitacion
    public Habitacion actualizarHabitacion(Long id, Habitacion nuevaHabitacion) {

        //busca si existe la habitacion.
        Optional<Habitacion> habitacionExistente = habitacionRepository.findById(id);

        if (habitacionExistente.isPresent()) {

            //pedimos los datos para actualizarlos
            Habitacion h = habitacionExistente.get();

            //actualizamos datos
            h.setTipo(nuevaHabitacion.getTipo());
            h.setPrecio(nuevaHabitacion.getPrecio());
            h.setDisponible(nuevaHabitacion.isDisponible());

            //actualiza el objeto
            return habitacionRepository.save(h);
        }
        return null; // si no existe, retorna null
    }


    //metodo para borrar una habitacion
    public Habitacion eliminarHabitacion(Long id) {

        Optional<Habitacion> habitacionEliminar = habitacionRepository.findById(id);

        if (habitacionEliminar.isPresent()) {
            habitacionRepository.deleteById(id);
            return habitacionEliminar.get();
        }

        return null;
    }
}
