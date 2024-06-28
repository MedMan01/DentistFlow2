package com.DentistFlow.DentistFlow.services;

import com.DentistFlow.DentistFlow.dtos.NewAntecedentDTO;
import com.DentistFlow.DentistFlow.dtos.NewPaymentDTO;
import com.DentistFlow.DentistFlow.entities.Antecedent;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.entities.Payment;
import com.DentistFlow.DentistFlow.repository.AntecedentRepository;
import com.DentistFlow.DentistFlow.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class AntecedentService {

    private final AntecedentRepository antecedentRepository;
    private final PatientRepository patientRepository;

    public AntecedentService(AntecedentRepository antecedentRepository, PatientRepository patientRepository) {
        this.antecedentRepository = antecedentRepository;
        this.patientRepository = patientRepository;
    }

    public Antecedent saveAntecedent(MultipartFile file, NewAntecedentDTO newAntecedentDTO) throws IOException {
        // Create the folder if it doesn't exist
        Path folderPath = Paths.get(System.getProperty("user.home"), "Dentist", "antecedents");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        // Create the file
        String fileName = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"), "Dentist", "antecedents", fileName + ".pdf");
        Files.copy(file.getInputStream(), filePath);

        // Find the patient
        Patient patient = patientRepository.findById(newAntecedentDTO.getPatientId()).get();

        // Create and save the antecedent
        Antecedent antecedent = Antecedent.builder()
                .dateCreation(LocalDate.now())
                .description(newAntecedentDTO.getDescription())
                .file(filePath.toUri().toString())
                .patient(patient)
                .build();
        return antecedentRepository.save(antecedent);
    }

    public Antecedent updateAntecedent( String description, String patientId, Long id) {
        // Find the patient and antecedent
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        Antecedent antecedent = antecedentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Antecedent not found"));

        // Update the antecedent
       // antecedent.setDateCreation(LocalDate.now());
        antecedent.setDescription(description);
        antecedent.setPatient(patient);
        return antecedentRepository.save(antecedent);
    }
    public byte[] getPaymentFile( Long antecedentId) throws IOException {

        Antecedent antecedent= antecedentRepository.findById(antecedentId).get();
        return Files.readAllBytes(Path.of(antecedent.getFile()));

    }
}
