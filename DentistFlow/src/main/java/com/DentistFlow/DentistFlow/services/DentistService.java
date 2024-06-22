package com.DentistFlow.DentistFlow.services;

import com.DentistFlow.DentistFlow.entities.Dentist;
import com.DentistFlow.DentistFlow.repository.DentistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class DentistService {
    @Autowired
    private DentistRepository dentistRepository;

    public DentistService(DentistRepository dentistRepository) {
        this.dentistRepository = dentistRepository;
    }

    public Dentist saveDentist(String code, String firstName, String lastName) throws IOException {

        Dentist payment=Dentist.builder()
                .id(UUID.randomUUID().toString())
                .code(code)
                .firstName(firstName)
                .lastName(lastName)
                .build();
        return dentistRepository.save(payment);
    }

    public Dentist updateDentist(String code, String firstName, String lastName, String id) {
        Dentist dentist=dentistRepository.findById(id).get();
        dentist.setCode(code);
        dentist.setFirstName(firstName);
        dentist.setLastName(lastName);
        return dentistRepository.save(dentist);
    }
}
