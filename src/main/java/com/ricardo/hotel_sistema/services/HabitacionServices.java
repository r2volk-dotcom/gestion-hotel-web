package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Habitacion;
import com.ricardo.hotel_sistema.repositorio.HabitacionRepository;
import org.springframework.stereotype.Service;

import com.ricardo.hotel_sistema.modelo.Servicio;
import com.ricardo.hotel_sistema.repositorio.ServicioRepository;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@Service
public class HabitacionServices {

    //variables que consultan la BD
    private HabitacionRepository habitacionRepository;
    private ServicioRepository servicioRepository;

    //constructor
    public HabitacionServices(HabitacionRepository habitacionRepository, ServicioRepository servicioRepository) {
        this.habitacionRepository = habitacionRepository;
        this.servicioRepository = servicioRepository;
    }

    //mostrar la lista de habitaciones
    public List<Habitacion> listar() {
        return habitacionRepository.findAll();
    }

    //buscar una habitacion por ID
    public Habitacion buscarHabitacionPorId(Long id) {
        //variable opcional, porque no sabemos si exite o no
        Optional<Habitacion> habitacion = habitacionRepository.findById(id);
        // si existe la devuelve, si no existe, retorna null
        return habitacion.orElse(null);
    }

    //guardar una habitacion nueva
    public Habitacion guardar(Habitacion habitacion){
        List<Servicio> serviciosSeleccionados = new ArrayList<>();

        for (Servicio servicio : habitacion.getServicios()) {
            serviciosSeleccionados.add(servicioRepository.getReferenceById(servicio.getId()));
        }
        habitacion.setServicios(serviciosSeleccionados);
        habitacion.setCodigo(formatearCodigo(habitacion.getCodigo(),habitacion.getTipo()));
        return habitacionRepository.save(habitacion);
    }

    //metodo para actualizar habitacion
    public Habitacion actualizarHabitacion(Long id, Habitacion nuevaHabitacion) {

        //busca si existe la habitacion.
        Optional<Habitacion> habitacionExistente = habitacionRepository.findById(id);

        if (habitacionExistente.isPresent()) {
            //pedimos los datos para actualizarlos
            Habitacion h = habitacionExistente.get();
            List<Servicio> serviciosSeleccionados = new ArrayList<>();

            for (Servicio s : nuevaHabitacion.getServicios()) {
                serviciosSeleccionados.add(servicioRepository.getReferenceById(s.getId()));
            }

            //actualizamos datos
            h.setTipo(nuevaHabitacion.getTipo());
            h.setCodigo(formatearCodigo(nuevaHabitacion.getCodigo(), nuevaHabitacion.getTipo()));
            h.setPrecio(nuevaHabitacion.getPrecio());
            h.setDisponible(nuevaHabitacion.isDisponible());
            h.setDescripcion(nuevaHabitacion.getDescripcion());
            h.setImagen(nuevaHabitacion.getImagen());
            h.setServicios(serviciosSeleccionados);

            //actualiza el objeto
            return habitacionRepository.save(h);
        }
        return null; // si no existe, retorna null
    }

    public String formatearCodigo(String codigo, String tipo) {
        // Valida que el codigo no sea nulo o vacio
        if (codigo == null || codigo.trim().isEmpty()) {
            return codigo;
        }

        String prefijo = "";
        if ("Simple".equals(tipo)) {
            prefijo = "SMP-";
        } else if ("Doble".equals(tipo)) {
            prefijo = "DOB-";
        } else if ("Matrimonial".equals(tipo)) {
            prefijo = "MAT-";
        } else if ("Suite".equals(tipo)) {
            prefijo = "STE-";
        } else if ("Familiar".equals(tipo)) {
            prefijo = "FAM-";
        } else if ("Deluxe".equals(tipo)) {
            prefijo = "DLX-";
        } else if ("Ejecutiva".equals(tipo)) {
            prefijo = "EJE-";
        } else if ("Presidencial".equals(tipo)) {
            prefijo = "PRE-";
        }

        // Evita duplicar el prefijo si ya existe
        if (!prefijo.isEmpty() && !codigo.startsWith(prefijo)) {
            return prefijo + codigo;
        }
        return codigo;
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
