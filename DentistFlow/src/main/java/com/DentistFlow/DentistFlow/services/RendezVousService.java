package com.DentistFlow.DentistFlow.services;

import com.DentistFlow.DentistFlow.Enum.TypeRendezVous;
import com.DentistFlow.DentistFlow.entities.Dentist;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.entities.RendezVous;
import com.DentistFlow.DentistFlow.repository.DentistRepository;
import com.DentistFlow.DentistFlow.repository.PatientRepository;
import com.DentistFlow.DentistFlow.repository.RendezVousRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class RendezVousService {
    @Autowired
    private RendezVousRepository rendezVousRepository;
    @Autowired
    public DentistRepository dentistRepository;
    @Autowired
    public PatientRepository patientRepository;



    public RendezVous saveRendezVous(LocalDate date, TypeRendezVous typeRendezVous,
                                  String dentistCode, String patientId) throws IOException {

        Dentist dentist = dentistRepository.findByCode(dentistCode);
        Patient patient = patientRepository.findById(patientId).get();

        RendezVous rendezVous=RendezVous.builder()
                .date(date)
                .typeRendezVous(typeRendezVous)
                .dentist(dentist)
                .patient(patient)
                .build();
        return rendezVousRepository.save(rendezVous);
    }
    public RendezVous updateRendezVous(Long id,LocalDate date, TypeRendezVous typeRendezVous, String dentistCode, String patientId){

        Dentist dentist=dentistRepository.findByCode(dentistCode);
        Patient patient=patientRepository.findById(patientId).get();

        RendezVous rendezVous=rendezVousRepository.findById(id).get();
        rendezVous.setDate(date);
        rendezVous.setTypeRendezVous(typeRendezVous);
        rendezVous.setDentist(dentist);
        rendezVous.setPatient(patient);
        return rendezVousRepository.save(rendezVous);
    }
}
