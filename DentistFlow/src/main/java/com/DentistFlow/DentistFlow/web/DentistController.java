package com.DentistFlow.DentistFlow.web;

import com.DentistFlow.DentistFlow.dtos.NewPatientDTO;
import com.DentistFlow.DentistFlow.entities.Dentist;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.repository.DentistRepository;
import com.DentistFlow.DentistFlow.services.DentistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
public class DentistController {
    @Autowired
    private DentistRepository dentistRepository;
    @Autowired
    private DentistService dentistService;

    public DentistController(DentistRepository dentistRepository, DentistService dentistService) {
        this.dentistRepository = dentistRepository;
        this.dentistService = dentistService;
    }

    @GetMapping("/dentists")
    public List<Dentist> allStudents(){
        return dentistRepository.findAll();
    }
    @GetMapping("/dentists/{code}")
    public Dentist getStudentByCode(@PathVariable String code){
        return dentistRepository.findByCode(code);
    }





    @PostMapping(path = "/dentists", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveDentist(@RequestBody Dentist dentist) {
        try {
            // Log pour vérifier les données reçues
            System.out.println("Received dentist request: " + dentist.toString());

            Dentist saveDentist = dentistService.saveDentist(dentist);
            return ResponseEntity.ok(saveDentist);
        } catch (Exception e) {
            // Log de l'exception pour le débogage
            e.printStackTrace();
            // Retourner une réponse d'erreur avec un message significatif
            return ResponseEntity.badRequest().body("Failed to save dentist: " + e.getMessage());
        }
    }

    @PutMapping("/dentist/{id}")
    public Dentist updateDentist(@RequestParam String code,@RequestParam String firstName,@RequestParam String lastName,@PathVariable String id){
        return dentistService.updateDentist(code,firstName,lastName, id);
    }
    @GetMapping("/dentistCount")
    public int DentistCount(){
        return (int) dentistRepository.findAll().stream().count();
    }

    @DeleteMapping("/dentist/{id}")
    public ResponseEntity<?> deleteSalle(@PathVariable String id) {
        dentistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
