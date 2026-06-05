package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Servicio;
import com.ricardo.hotel_sistema.repositorio.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioServices {

    private ServicioRepository servicioRepository;

    public ServicioServices(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    //mostrar lista de servicios
    public List<Servicio> listar(){ return servicioRepository.findAll();}

    //guardar servicio nuevo
    public Servicio guardar(Servicio servicio){
        return servicioRepository.save(servicio);
    }

    //borrar servicio
    public Servicio borrarServicio(Long id){
        Optional<Servicio> servicioEliminar = servicioRepository.findById(id);
        if (servicioEliminar.isPresent()){
            servicioRepository.deleteById(id);
            return servicioEliminar.get();
        }
        return null;
    }
}
