package com.DentistFlow.DentistFlow.entities;

import com.DentistFlow.DentistFlow.Enum.Sexe;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Patient {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private Sexe sexe;
    private int age;
    private String telephone;
    private String email;


}
