package com.DentistFlow.DentistFlow.repository;

import com.DentistFlow.DentistFlow.Enum.PaymentStatus;
import com.DentistFlow.DentistFlow.Enum.PaymentType;
import com.DentistFlow.DentistFlow.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByRendezVousId(Long id);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByType(PaymentType type);
}
