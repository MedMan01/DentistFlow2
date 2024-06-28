package com.DentistFlow.DentistFlow.dtos;

import com.DentistFlow.DentistFlow.Enum.Sexe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class NewPatientDTO {
    private String firstName;
    private String lastName;
    private Sexe sexe;
    private Integer age;
    private String telephone;
    private String email;
}
