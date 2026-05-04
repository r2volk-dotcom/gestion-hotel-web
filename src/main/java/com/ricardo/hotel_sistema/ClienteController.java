package com.ricardo.hotel_sistema;

import com.ricardo.hotel_sistema.modelo.Cliente;
import com.ricardo.hotel_sistema.services.ClienteServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Indica que es una clase controlador REST, devuelve datos en formato JSON automaticamente
@RestController

//Define la ruta base para todos los endpoints de este controlador (Ejem: http://localhost:8080/clientes/...)
@RequestMapping("/clientes")
public class ClienteController {

    //variable del servicio que maneja la logica de negocio
    private ClienteServices clienteServices;

    //constructor
    public ClienteController(ClienteServices clienteServices) {
        this.clienteServices = clienteServices;
    }

    // GetMapping (GET), para obtener todos los clientes
    @GetMapping
    public List<Cliente> listar() {
        return clienteServices.listar();
    }

    // GetMapping (GET), con endpoint(habitacion/id), para buscar un cliente por ID
    // PathVariable es la variable que va en la url.
    @GetMapping("/id/{id}")
    public Cliente buscarPorId(@PathVariable Long id) {
        return clienteServices.buscarClientePorId(id);
    }

    @GetMapping("/nombre/{nombre}")
    public List<Cliente> buscarPorNombre(@PathVariable String nombre) {
        return clienteServices.buscarClientePorNombre(nombre);
    }

    // PostMapping (POST), para enviar (guardar) datos a la BD
    // RequestBody convierte el JSON recibido en un objeto Cliente
    @PostMapping
    public Cliente guardar(@RequestBody Cliente cliente) {
        return clienteServices.guardar(cliente);
    }

    // PutMapping (PUT), para actualizar datos.
    @PutMapping("/{id}")
    public Cliente actualizar(@PathVariable Long id, @RequestBody Cliente nuevoCliente) {
        return clienteServices.actualizarCliente(id, nuevoCliente);
    }

    // @DeleteMapping (DELETE), Elimina un cliente según su ID.
    @DeleteMapping("/{id}")
    public Cliente eliminar(@PathVariable Long id) {
        return clienteServices.eliminarCliente(id);

    }
}
