package com.ricardo.hotel_sistema;

import com.ricardo.hotel_sistema.modelo.Promocion;
import com.ricardo.hotel_sistema.services.PromocionServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promociones")
public class PromocionController {

    private final PromocionServices promocionServices;

    public PromocionController(PromocionServices promocionServices) {
        this.promocionServices = promocionServices;
    }

    // GET /promociones - Obtener todas las promociones
    @GetMapping
    public List<Promocion> listar() {
        return promocionServices.listar();
    }

    // GET /promociones/activa - Obtener la promoción activa actual
    @GetMapping("/activa")
    public Promocion buscarActiva() {
        return promocionServices.buscarPromocionActiva();
    }

    // GET /promociones/{id} - Buscar por ID
    @GetMapping("/{id}")
    public Promocion buscarPorId(@PathVariable Long id) {
        return promocionServices.buscarPromocionPorId(id);
    }

    // POST /promociones - Crear nueva promoción
    @PostMapping
    public Promocion guardar(@RequestBody Promocion promocion) {
        return promocionServices.guardar(promocion);
    }

    // PUT /promociones/activar/{id} - Activar una promoción
    @PutMapping("/activar/{id}")
    public Promocion activar(@PathVariable Long id) {
        return promocionServices.activarPromocion(id);
    }

    // PUT /promociones/desactivar-todas - Desactivar todas las promociones
    @PutMapping("/desactivar-todas")
    public String desactivarTodas() {
        promocionServices.desactivarTodas();
        return "Todas las promociones han sido desactivadas.";
    }

    // DELETE /promociones/{id} - Eliminar promoción
    @DeleteMapping("/{id}")
    public Promocion eliminar(@PathVariable Long id) {
        return promocionServices.eliminarPromocion(id);
    }
}
