package com.DentistFlow.DentistFlow.repository;

import com.DentistFlow.DentistFlow.entities.Antecedent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AntecedentRepository extends JpaRepository<Antecedent, Long> {

    List<Antecedent>findByPatientId(String id);
    List<Antecedent>findBydateCreation(LocalDate localDate);

    }
