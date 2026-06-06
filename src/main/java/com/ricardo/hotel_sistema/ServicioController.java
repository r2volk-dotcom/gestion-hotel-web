package com.ricardo.hotel_sistema;

import com.ricardo.hotel_sistema.modelo.Servicio;
import com.ricardo.hotel_sistema.services.ServicioServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/servicios")
public class ServicioController {

    private ServicioServices servicioServices;

    public ServicioController(ServicioServices servicioServices) {
        this.servicioServices = servicioServices;
    }

    @GetMapping
    public List<Servicio> listar() {return servicioServices.listar();}

    @PostMapping
    public Servicio guardar(@RequestBody Servicio servicio) {
        return servicioServices.guardar(servicio);
    }

    @DeleteMapping("/{id}")
    public Servicio eliminar(@PathVariable Long id) {
        return servicioServices.borrarServicio(id);
    }
}
