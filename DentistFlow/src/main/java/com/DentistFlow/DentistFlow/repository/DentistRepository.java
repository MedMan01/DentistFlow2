package com.DentistFlow.DentistFlow.repository;

import com.DentistFlow.DentistFlow.entities.Dentist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DentistRepository extends JpaRepository<Dentist, String> {
    Dentist findByCode(String code);
}
