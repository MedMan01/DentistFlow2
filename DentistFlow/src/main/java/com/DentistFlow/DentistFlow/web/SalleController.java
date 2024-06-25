package com.DentistFlow.DentistFlow.web;

import com.DentistFlow.DentistFlow.Enum.EtatSalle;
import com.DentistFlow.DentistFlow.Enum.Sexe;
import com.DentistFlow.DentistFlow.Enum.TypeSalle;
import com.DentistFlow.DentistFlow.entities.Patient;
import com.DentistFlow.DentistFlow.entities.Salle;
import com.DentistFlow.DentistFlow.repository.AntecedentRepository;
import com.DentistFlow.DentistFlow.repository.PatientRepository;
import com.DentistFlow.DentistFlow.repository.SalleRepository;
import com.DentistFlow.DentistFlow.services.AntecedentService;
import com.DentistFlow.DentistFlow.services.SalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;

@RestController
@CrossOrigin("*")
public class SalleController {
    @Autowired
    private SalleRepository salleRepository;
    @Autowired
    private SalleService salleService;


    public SalleController(SalleRepository salleRepository, SalleService salleService) {
        this.salleRepository = salleRepository;
        this.salleService = salleService;
    }
    @GetMapping("/salles")
    public List<Salle> allSalles(){
        return salleRepository.findAll();
    }


    @GetMapping("/salles/{id}")
    public Salle SallesById(@PathVariable Long id){
        return salleRepository.findById(id).get();
    }

    @GetMapping("/sallesBynumeroSalle")
    public Salle PatientBynumeroSalle(@RequestParam String numeroSalle){
        return salleRepository.findBynumeroSalle(numeroSalle);
    }

    @GetMapping("/sallesByEtatSalle")
    public List<Salle>SalleByEtatSalle(@RequestParam EtatSalle etatSalle){
        return salleRepository.findByEtatSalle(etatSalle);
    }
    @GetMapping("/sallesByTypeSalle")
    public List<Salle>SalleByTypeSalle(@RequestParam TypeSalle typeSalle){
        return salleRepository.findByTypeSalle(typeSalle);
    }

    @PostMapping(path= "/salles", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Salle saveSalle(String numeroSalle, EtatSalle etatSalle, TypeSalle typeSalle) throws IOException {
        return salleService.saveSalle(numeroSalle, etatSalle, typeSalle);
    }

    @PutMapping("/salles/{id}")
    public Salle updateSalles(String numeroSalle, EtatSalle etatSalle, TypeSalle typeSalle,@PathVariable Long id){
        return salleService.updateSalle(numeroSalle,etatSalle,typeSalle,id);
    }
    @DeleteMapping("/salles/{id}")
    public ResponseEntity<?> deleteSalle(@PathVariable Long id) {
        salleRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
