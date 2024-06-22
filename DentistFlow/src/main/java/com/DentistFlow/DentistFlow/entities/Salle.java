package com.DentistFlow.DentistFlow.entities;

import com.DentistFlow.DentistFlow.Enum.EtatSalle;
import com.DentistFlow.DentistFlow.Enum.TypeSalle;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String numeroSalle;
    private EtatSalle etatSalle;
    private TypeSalle typeSalle;

 /*   @ManyToMany(mappedBy = "salle",fetch = FetchType.LAZY)
    private Set<Dentist> dentists;*/

}
