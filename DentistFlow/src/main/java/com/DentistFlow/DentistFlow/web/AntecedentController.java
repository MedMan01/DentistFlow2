package com.DentistFlow.DentistFlow.web;

import com.DentistFlow.DentistFlow.Enum.Sexe;
import com.DentistFlow.DentistFlow.entities.Antecedent;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.repository.AntecedentRepository;
import com.DentistFlow.DentistFlow.repository.PatientRepository;
import com.DentistFlow.DentistFlow.services.AntecedentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;

@RestController

public class AntecedentController {
    @Autowired
    private AntecedentRepository antecedentRepository;

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private AntecedentService antecedentService;

    public AntecedentController(AntecedentRepository antecedentRepository, PatientRepository patientRepository) {
        this.antecedentRepository = antecedentRepository;
        this.patientRepository = patientRepository;
    }

    @GetMapping(path = "/antecedents")
    public List<Antecedent> allAntecedent(){
        return antecedentRepository.findAll();
    }

    @GetMapping(path = "/patients/{id}/antecedents")
    public List<Antecedent> AntecedentsByPatient(@PathVariable String id){
        return antecedentRepository.findByPatientId(id);
    }
    @GetMapping("/antecedentByDateCreation")

    public List<Antecedent>AntecedentByDateCreation(@RequestParam LocalDate localDate){
        return antecedentRepository.findBydateCreation(localDate);
    }

    @GetMapping(path = "/antecedents/{id}")
    public Antecedent getAntecedentById(@PathVariable Long id){
        return antecedentRepository.findById(id).get();
    }

    @PostMapping(path= "/antecedents", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Antecedent saveAntecedent(@RequestParam MultipartFile file, String description, String patientId) throws IOException {
        return antecedentService.saveAntecedent(file, description, patientId);
    }

    @PutMapping("/antecedents/{id}")
    public Antecedent updateAntecedents(String description,String patientId,@PathVariable Long id){
        return antecedentService.updateAntecedent(description,patientId,id);
    }


    @DeleteMapping("/antecedents/{id}")
    public ResponseEntity<?> deleteAntecedent(@PathVariable Long id) {
        antecedentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    }