package com.DentistFlow.DentistFlow.web;

import com.DentistFlow.DentistFlow.Enum.Sexe;
import com.DentistFlow.DentistFlow.entities.Antecedent;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.repository.PatientRepository;
import com.DentistFlow.DentistFlow.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private PatientService patientService;

    public PatientController(PatientRepository patientRepository, PatientService patientService) {
        this.patientRepository = patientRepository;
        this.patientService = patientService;
    }

    @GetMapping("/patients")
    public List<Patient> allPatients(){
        return patientRepository.findAll();
    }

    @GetMapping("/patients/{id}")
    public Patient PatientsById(@PathVariable String id){
        return patientRepository.findById(id).get();
    }

    @GetMapping("/patientsBySexe")
    public List<Patient>PatientBySexe(@RequestParam Sexe sexe){
        return patientRepository.findBySexe(sexe);
    }

    @GetMapping("/patientsByEmail")
    public List<Patient>PatientByEmail(@RequestParam String email){
        return patientRepository.findByEmail(email);
    }

    @PostMapping(path= "/patients", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Patient savePatient(@RequestParam String firstName,@RequestParam String lastName,@RequestParam Sexe sexe,@RequestParam int age,@RequestParam  String tel,@RequestParam String email) throws IOException {
        return patientService.savePatient(firstName, lastName, sexe, age, tel, email);
    }

    @PutMapping("/patients/{id}")
    public Patient updatePatients(@RequestParam String firstName,@RequestParam String lastName,@RequestParam Sexe sexe,@RequestParam int age,@RequestParam String tel,@RequestParam String email ,@PathVariable String id){
        return patientService.updatePatient(id,firstName,lastName,sexe,age,tel,email);
    }
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable String id) {
        patientRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
