package com.ricardo.hotel_sistema.services;

import com.ricardo.hotel_sistema.modelo.Promocion;
import com.ricardo.hotel_sistema.repositorio.PromocionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromocionServices {

    private final PromocionRepository promocionRepository;

    public PromocionServices(PromocionRepository promocionRepository) {
        this.promocionRepository = promocionRepository;
    }

    // Listar todas las promociones
    public List<Promocion> listar() {
        return promocionRepository.findAll();
    }

    // Buscar promoción por ID
    public Promocion buscarPromocionPorId(Long id) {
        Optional<Promocion> promocion = promocionRepository.findById(id);
        return promocion.orElse(null);
    }

    // Obtener la promoción activa actualmente
    public Promocion buscarPromocionActiva() {
        Optional<Promocion> promocion = promocionRepository.findByActiva(true);
        return promocion.orElse(null);
    }

    // Guardar una promoción
    public Promocion guardar(Promocion promocion) {
        // Si se guarda como activa, desactivamos el resto primero
        if (promocion.isActiva()) {
            desactivarTodas();
        }
        return promocionRepository.save(promocion);
    }


    // Activar una promoción específica y desactivar las demás
    public Promocion activarPromocion(Long id) {
        Optional<Promocion> promoExistente = promocionRepository.findById(id);
        if (promoExistente.isPresent()) {
            desactivarTodas();
            Promocion p = promoExistente.get();
            p.setActiva(true);
            return promocionRepository.save(p);
        }
        return null;
    }

    // Desactivar todas las promociones (ej. cuando se vuelve a precios normales)
    public void desactivarTodas() {
        List<Promocion> promociones = promocionRepository.findAll();
        for (Promocion p : promociones) {
            if (p.isActiva()) {
                p.setActiva(false);
                promocionRepository.save(p);
            }
        }
    }

    // Eliminar una promoción
    public Promocion eliminarPromocion(Long id) {
        Optional<Promocion> promoEliminar = promocionRepository.findById(id);
        if (promoEliminar.isPresent()) {
            promocionRepository.deleteById(id);
            return promoEliminar.get();
        }
        return null;
    }
}
