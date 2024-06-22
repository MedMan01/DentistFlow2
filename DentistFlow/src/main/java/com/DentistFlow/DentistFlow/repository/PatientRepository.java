package com.DentistFlow.DentistFlow.repository;

import com.DentistFlow.DentistFlow.Enum.Sexe;
import com.DentistFlow.DentistFlow.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface    PatientRepository extends JpaRepository<Patient, String> {
    List<Patient> findByEmail(String email);
    List<Patient> findBySexe(Sexe sexe);

}
