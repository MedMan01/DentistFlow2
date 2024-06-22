package com.DentistFlow.DentistFlow.entities;

import com.DentistFlow.DentistFlow.Enum.TypeRendezVous;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class RendezVous {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;
    private TypeRendezVous typeRendezVous;

    @ManyToOne
    private Dentist dentist;

    @ManyToOne
    private Patient patient;



}
