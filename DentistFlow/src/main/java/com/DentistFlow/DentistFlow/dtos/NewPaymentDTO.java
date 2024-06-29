package com.DentistFlow.DentistFlow.dtos;

import com.DentistFlow.DentistFlow.Enum.PaymentStatus;
import com.DentistFlow.DentistFlow.Enum.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class NewPaymentDTO {
       private double amount;
       private PaymentType type;
       private PaymentStatus status;
       private LocalDate date;
       private Long rendezvousId;
}
