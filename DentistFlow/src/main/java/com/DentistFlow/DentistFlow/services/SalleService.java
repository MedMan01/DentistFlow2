package com.DentistFlow.DentistFlow.services;

import com.DentistFlow.DentistFlow.Enum.EtatSalle;
import com.DentistFlow.DentistFlow.Enum.Sexe;
import com.DentistFlow.DentistFlow.Enum.TypeSalle;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.entities.Salle;
import com.DentistFlow.DentistFlow.repository.SalleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.UUID;

@Service
public class SalleService {
    @Autowired
    private SalleRepository salleRepository;


    public SalleService(SalleRepository salleRepository) {
        this.salleRepository = salleRepository;
    }

    public Salle saveSalle(String numeroSalle, EtatSalle etatSalle, TypeSalle typeSalle) throws IOException {


        // Create and save the antecedent
        Salle salle = Salle.builder()
                .numeroSalle(numeroSalle)
                .etatSalle(etatSalle)
                .typeSalle(typeSalle)
                .build();
        return salleRepository.save(salle);
    }
    public Salle updateSalle(String numeroSalle, EtatSalle etatSalle, TypeSalle typeSalle,Long id) {
        // Find the patient and antecedent

        Salle salle = salleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("salle not found"));

        // Update the antecedent
        // antecedent.setDateCreation(LocalDate.now());
        salle.setNumeroSalle(numeroSalle);
        salle.setEtatSalle(etatSalle);
        salle.setTypeSalle(typeSalle);

        return salleRepository.save(salle);
    }
}
