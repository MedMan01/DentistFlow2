package com.DentistFlow.DentistFlow.dtos;

import com.DentistFlow.DentistFlow.Enum.PaymentType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class NewAntecedentDTO {
    private String description;
    private String patientId;


}
