package com.ricardo.hotel_sistema;

import com.ricardo.hotel_sistema.modelo.Pago;
import com.ricardo.hotel_sistema.services.PagoServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagos")
public class PagoController {

    private PagoServices pagoServicio;

    public PagoController(PagoServices pagoServicio) {this.pagoServicio = pagoServicio;}

    @GetMapping
    public List<Pago> listar() { return pagoServicio.listar();}

    @GetMapping("/{id}")
    public Pago buscarPorId(@PathVariable Long id){return pagoServicio.buscarPorId(id);}

    @PostMapping
    public Pago guardar(@RequestBody Pago pago){ return pagoServicio.guardar(pago);}

    @PutMapping("/{id}")
    public Pago actualizar(@PathVariable Long id, @RequestBody Pago pago){
        return pagoServicio.actualizarPago(id,pago);
    }

    @DeleteMapping("/{id}")
    public Pago eliminar(@PathVariable Long id){
        return pagoServicio.eliminarPago(id);
    }

}
