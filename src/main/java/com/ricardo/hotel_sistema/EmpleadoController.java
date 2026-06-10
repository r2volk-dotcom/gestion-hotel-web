package com.ricardo.hotel_sistema;

import com.ricardo.hotel_sistema.modelo.Empleado;
import com.ricardo.hotel_sistema.services.EmpleadoServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {

    private final EmpleadoServices empleadoServices;

    public EmpleadoController(EmpleadoServices empleadoServices) {
        this.empleadoServices = empleadoServices;
    }

    // GET /empleados - Obtener todos los empleados
    @GetMapping
    public List<Empleado> listar() {
        return empleadoServices.listar();
    }

    // GET /empleados/{id} - Buscar por ID
    @GetMapping("/{id}")
    public Empleado buscarPorId(@PathVariable Long id) {
        return empleadoServices.buscarEmpleadoPorId(id);
    }

    // POST /empleados - Crear nuevo empleado
    @PostMapping
    public Empleado guardar(@RequestBody Empleado empleado) {
        return empleadoServices.guardar(empleado);
    }

    // PUT /empleados/{id} - Actualizar empleado
    @PutMapping("/{id}")
    public Empleado actualizar(@PathVariable Long id, @RequestBody Empleado empleado) {
        return empleadoServices.actualizarEmpleado(id, empleado);
    }

    // DELETE /empleados/{id} - Eliminar empleado
    @DeleteMapping("/{id}")
    public Empleado eliminar(@PathVariable Long id) {
        return empleadoServices.eliminarEmpleado(id);
    }
}
