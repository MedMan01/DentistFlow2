package com.DentistFlow.DentistFlow.web;

import com.DentistFlow.DentistFlow.Enum.Sexe;
import com.DentistFlow.DentistFlow.Enum.TypeRendezVous;
import com.DentistFlow.DentistFlow.entities.Antecedent;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.entities.RendezVous;
import com.DentistFlow.DentistFlow.repository.DentistRepository;
import com.DentistFlow.DentistFlow.repository.RendezVousRepository;
import com.DentistFlow.DentistFlow.services.RendezVousService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
public class RendezVousController {
    @Autowired
    private RendezVousRepository rendezVousRepository;
    @Autowired
    private RendezVousService rendezVousService;
    @Autowired
    private DentistRepository dentistRepository;


    @GetMapping(path = "/rendezVous")
    public List<RendezVous> allRendezVous(){
        return rendezVousRepository.findAll();
    }

    @GetMapping(path = "/dentists/{code}/rendezvous")
    public List<RendezVous> RendezVousByDentist(@PathVariable String code){
        return rendezVousRepository.findByDentistCode(code);
    }
    @GetMapping(path = "/patients/{id}/rendezvous")
    public List<RendezVous> RendezVousByPatient(@PathVariable String id){
        return rendezVousRepository.findByPatientId(id);
    }


    @GetMapping(path = "/rendezvous/bytyperendzvous")
    public List<RendezVous> RendezVousByTypeRendezVous(@RequestParam TypeRendezVous typeRendezVous){
        return rendezVousRepository.findByTypeRendezVous(typeRendezVous);
    }
    @GetMapping("/rendezvousCount")
    public int RendezVousCount(){
        return (int) rendezVousRepository.findAll().stream().count();
    }

    @GetMapping(path = "/rendezvous/{id}")
    public RendezVous getRendezVousById(@PathVariable Long id){
        return rendezVousRepository.findById(id).get();
    }

    @PostMapping(path= "/rendezvous", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public RendezVous saveRendezVous(LocalDate date, TypeRendezVous typeRendezVous,
                                  String dentistCode, String patientId) throws IOException {
        return rendezVousService.saveRendezVous(date, typeRendezVous, dentistCode, patientId);
    }

    @PutMapping("/rendezvous/{id}")
    public RendezVous updateRendezVous(@PathVariable Long id,LocalDate date, TypeRendezVous typeRendezVous, String dentistCode, String patientId){
        return rendezVousService.updateRendezVous(id,date,typeRendezVous,dentistCode,patientId);
    }
    @DeleteMapping("/rendezvous/{id}")
    public ResponseEntity<?> deleteRendezVous(@PathVariable Long id) {
        rendezVousRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
