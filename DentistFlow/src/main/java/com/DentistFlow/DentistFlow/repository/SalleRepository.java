package com.DentistFlow.DentistFlow.repository;

import com.DentistFlow.DentistFlow.Enum.EtatSalle;
import com.DentistFlow.DentistFlow.Enum.TypeSalle;
import com.DentistFlow.DentistFlow.entities.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalleRepository extends JpaRepository<Salle, Long> {
    Salle findBynumeroSalle(String numeroSalle);
    List<Salle> findByEtatSalle(EtatSalle etatSalle);
    List<Salle> findByTypeSalle(TypeSalle typeSalle);

}
