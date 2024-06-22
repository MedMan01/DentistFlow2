package com.DentistFlow.DentistFlow.repository;

import com.DentistFlow.DentistFlow.Enum.TypeRendezVous;
import com.DentistFlow.DentistFlow.entities.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findBydate(LocalDate date);
    List<RendezVous> findByTypeRendezVous(TypeRendezVous rendezVous);
    List<RendezVous> findByDentistCode(String code);
    List<RendezVous> findByPatientId(String id);
}
