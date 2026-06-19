package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Cliente;
import com.ricardo.hotel_sistema.repositorio.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ClienteServices {

    //variable ClienteRepository que sabe como consultar la BD
    private ClienteRepository clienteRepository;

    //constructor
    public ClienteServices(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    //mostrar lista de clientes
    public List<Cliente> listar(){
        return clienteRepository.findAll();
    }

    //metodo para buscar un cliente por ID
    public Cliente buscarClientePorId(Long id){
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.orElse(null);
    }

    public List<Cliente> buscarClientePorNombre(String nombre){
        if (nombre != null && !nombre.isBlank()){
            String[] nombreApellido = nombre.split("\\s+");
            if (nombreApellido.length == 1) {
                return clienteRepository.findByNombre(formatear(nombreApellido[0]));
            }else if (nombreApellido.length >= 2) {
                return clienteRepository.findByNombreAndApellido(formatear(nombreApellido[0]),formatear(nombreApellido[1]));
            }
        }
        return List.of();
    }

    // guardar un cliente a la lista de clientes
    public Cliente guardar(Cliente cliente){
        cliente.setNombre(formatear(cliente.getNombre()));
        cliente.setApellido(formatear(cliente.getApellido()));
        return clienteRepository.save(cliente);
    }

    private String formatear(String texto){
        if(texto != null){
            texto = texto.trim();
            if(!texto.isEmpty()){
                texto = texto.substring(0, 1).toUpperCase() + texto.substring(1);
            }
            return texto;
        }
        return null;
    }

    // Actualizar cliente existente
    public Cliente actualizarCliente(Long id, Cliente cliente){

        //busca si existe la habitacion.
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if(clienteExistente.isPresent()){

            //pedimos los datos para actualizarlos
            Cliente c = clienteExistente.get();

            //actualizamos datos
            c.setNombre(cliente.getNombre());
            c.setApellido(cliente.getApellido());
            c.setDni(cliente.getDni());
            c.setTelefono(cliente.getTelefono());
            c.setCorreo(cliente.getCorreo());

            return clienteRepository.save(c);
        }
        return null;
    }

    //metodo para borrar un cliente
    public Cliente eliminarCliente(Long id){

        Optional<Cliente> clienteEliminar = clienteRepository.findById(id);

        if (clienteEliminar.isPresent()){
            clienteRepository.deleteById(id);
            return clienteEliminar.get();
        }
        return null;
    }
}
