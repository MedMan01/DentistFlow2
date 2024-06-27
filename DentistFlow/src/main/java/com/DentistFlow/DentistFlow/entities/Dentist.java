package com.DentistFlow.DentistFlow.entities;

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
public class Dentist {
    @Id
    private String id;
    @Column(unique = true)
    private String code;
    private String firstName;
    private String lastName;


   /* @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name="DENTIST_SALLE",
            joinColumns = {
                @JoinColumn(name = "dentist_Id", referencedColumnName = "id")
    },
        inverseJoinColumns = {
            @JoinColumn(name = "salle_id", referencedColumnName = "id")
        }

    )
    private Set<Salle> salle;*/


}
