package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Empleado;
import com.ricardo.hotel_sistema.repositorio.EmpleadoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoServices {

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoServices(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    // Listar todos los empleados
    public List<Empleado> listar() {
        return empleadoRepository.findAll();
    }

    // Buscar empleado por ID
    public Empleado buscarEmpleadoPorId(Long id) {
        Optional<Empleado> empleado = empleadoRepository.findById(id);
        return empleado.orElse(null);
    }

    // Buscar por usuario
    public Empleado buscarEmpleadoPorUsuario(String usuario) {
        Optional<Empleado> empleado = empleadoRepository.findByUsuario(usuario);
        return empleado.orElse(null);
    }

    // Guardar nuevo empleado
    public Empleado guardar(Empleado empleado) {
        // Formatear nombre y apellido con primera letra mayúscula
        empleado.setNombre(formatear(empleado.getNombre()));
        empleado.setApellido(formatear(empleado.getApellido()));
        return empleadoRepository.save(empleado);
    }

    // Actualizar empleado existente
    public Empleado actualizarEmpleado(Long id, Empleado empleado) {
        Optional<Empleado> empleadoExistente = empleadoRepository.findById(id);

        if (empleadoExistente.isPresent()) {
            Empleado e = empleadoExistente.get();
            e.setNombre(formatear(empleado.getNombre()));
            e.setApellido(formatear(empleado.getApellido()));
            e.setUsuario(empleado.getUsuario());
            e.setContrasena(empleado.getContrasena());
            e.setRol(empleado.getRol());

            return empleadoRepository.save(e);
        }
        return null;
    }

    // Eliminar un empleado
    public Empleado eliminarEmpleado(Long id) {
        Optional<Empleado> empleadoEliminar = empleadoRepository.findById(id);
        if (empleadoEliminar.isPresent()) {
            empleadoRepository.deleteById(id);
            return empleadoEliminar.get();
        }
        return null;
    }

    // Metodo de formato de texto (primera letra en mayúscula)
    private String formatear(String texto) {
        if (texto != null) {
            texto = texto.trim();
            if (!texto.isEmpty()) {
                texto = texto.substring(0, 1).toUpperCase() + texto.substring(1);
            }
            return texto;
        }
        return null;
    }
}
