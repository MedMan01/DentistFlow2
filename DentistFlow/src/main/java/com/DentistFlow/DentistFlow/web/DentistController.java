package com.DentistFlow.DentistFlow.web;

import com.DentistFlow.DentistFlow.entities.Dentist;
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





    @PostMapping(path= "/dentists", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Dentist saveDentist(@RequestParam String code,@RequestParam String firstName,@RequestParam String lastName) throws IOException {
        return dentistService.saveDentist(code,firstName, lastName);
    }

    @PutMapping("/dentist/{id}")
    public Dentist updateDentist(@RequestParam String code,@RequestParam String firstName,@RequestParam String lastName,@PathVariable String id){
        return dentistService.updateDentist(code,firstName,lastName, id);
    }

    @DeleteMapping("/dentist/{id}")
    public ResponseEntity<?> deleteSalle(@PathVariable String id) {
        dentistRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
