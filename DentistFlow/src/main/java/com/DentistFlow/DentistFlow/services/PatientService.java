package com.DentistFlow.DentistFlow.services;

import com.DentistFlow.DentistFlow.Enum.Sexe;
import com.DentistFlow.DentistFlow.entities.Antecedent;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.repository.PatientRepository;
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
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;


    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }
    public Patient savePatient(String firstName, String lastName, Sexe sexe, int age, String tel, String email) throws IOException {


        // Create and save the antecedent
        Patient patient = Patient.builder()
                .id(UUID.randomUUID().toString())
                .firstName(firstName)
                .lastName(lastName)
                .sexe(sexe)
                .age(age)
                .telephone(tel)
                .email(email)
                .build();
        return patientRepository.save(patient);
    }
    public Patient updatePatient( String id, String firstName, String lastName, Sexe sexe, int age, String tel, String email) {
        // Find the patient and antecedent

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Antecedent not found"));

        // Update the antecedent
        // antecedent.setDateCreation(LocalDate.now());
        patient.setFirstName(firstName);
        patient.setLastName(lastName);
        patient.setSexe(sexe);
        patient.setAge(age);
        patient.setTelephone(tel);
        patient.setEmail(email);

        return patientRepository.save(patient);
    }

}
