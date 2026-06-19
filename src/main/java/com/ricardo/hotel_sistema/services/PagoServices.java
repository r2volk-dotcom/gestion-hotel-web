package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Pago;
import com.ricardo.hotel_sistema.repositorio.PagoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagoServices {

    private PagoRepository pagoRepository;

    //constructor
    public PagoServices(PagoRepository pagoRepository) {this.pagoRepository = pagoRepository;}

    //mostrar lista de pagos
    public List<Pago> listar(){
        return pagoRepository.findAll();
    }

    //buscar pago por ID
    public Pago buscarPorId(Long id){
        Optional<Pago> pago = pagoRepository.findById(id);
        return pago.orElse(null);
    }

    //guardar pago a la lista de pagos
    public Pago guardar(Pago pago){
        return pagoRepository.save(pago);
    }

    public Pago actualizarPago(Long id,Pago pagoNuevo){

        //buscamos si existe el pago
        Optional<Pago> pagoExistente = pagoRepository.findById(id);

        if(pagoExistente.isPresent()){
            //pido los datos para actualizarlos
            Pago p = pagoExistente.get();
            p.setEstado(pagoNuevo.getEstado());
            p.setFechaPago(pagoNuevo.getFechaPago());
            p.setMetodoPago(pagoNuevo.getMetodoPago());
            p.setMonto(pagoNuevo.getMonto());
            p.setReservaId(pagoNuevo.getReservaId());

            return pagoRepository.save(p);
        }
        return null;
    }

    public Pago eliminarPago(Long id){

        Optional<Pago> pagoELiminar = pagoRepository.findById(id);

        if(pagoELiminar.isPresent()){
            pagoRepository.deleteById(id);
            return pagoELiminar.get();
        }
        return null;
    }

    public void eliminarPagoPorReserva(Long reservaId){
        pagoRepository.deleteByReservaId(reservaId);
    }

}
