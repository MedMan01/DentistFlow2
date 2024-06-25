package com.DentistFlow.DentistFlow;

import com.DentistFlow.DentistFlow.Enum.*;
import com.DentistFlow.DentistFlow.entities.*;
import com.DentistFlow.DentistFlow.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class DentistFlowApplication {

	public static void main(String[] args) {
		SpringApplication.run(DentistFlowApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(AntecedentRepository antecedentRepository,
										PatientRepository patientRepository,
										SalleRepository salleRepository,
										DentistRepository dentistRepository,
										RendezVousRepository rendezVousRepository,
										PaymentRepository paymentRepository){
return args -> {
	patientRepository.save(Patient.builder().id(UUID.randomUUID().toString())
					.firstName("Med")
					.lastName("Man")
					.sexe(Sexe.M)
					.age(23)
					.telephone("0623643133")
					.email("Med@gmail.com")
			.build());
	patientRepository.save(Patient.builder().id("QWER-DEDE-ASDCCF-cefwfEWFE")
			.firstName("Fahd")
			.lastName("Misnahi")
			.sexe(Sexe.M)
			.age(23)
			.telephone("0623643133")
			.email("Med@gmail.com")
			.build());
	patientRepository.findAll().forEach(pt -> {
				for (int i = 0; i < 10; i++) {
					Antecedent antecedent = Antecedent.builder()
							.dateCreation(LocalDate.now())
							.description("Test"+(i+1))
							.patient(pt)
							.build();
					antecedentRepository.save(antecedent);

				}
			});
	salleRepository.save(Salle.builder()
					.numeroSalle("A01")
					.etatSalle(EtatSalle.Disponible)
					.typeSalle(TypeSalle.administratif)
			.build());
	salleRepository.save(Salle.builder()
			.numeroSalle("A02")
			.etatSalle(EtatSalle.NonDisponible)
			.typeSalle(TypeSalle.radiographie)
			.build());
	salleRepository.save(Salle.builder()
			.numeroSalle("A03")
			.etatSalle(EtatSalle.Disponible)
			.typeSalle(TypeSalle.consultation)
			.build());
	dentistRepository.save(Dentist.builder()
					.id(UUID.randomUUID().toString())
					.code("D1")
					.firstName("Med")
					.lastName("Man")
			.build());
	dentistRepository.save(Dentist.builder()
			.id("az-cfffe--feeffvefev-vfv")
			.code("D2")
			.firstName("Fahd")
			.lastName("Misbahi")
			.build());
	dentistRepository.save(Dentist.builder()
			.id("ADRT-RTTEE-DDDED-VMNG")
			.code("D3")
			.firstName("Mohammed")
			.lastName("Man")
			.build());

	rendezVousRepository.save(RendezVous.builder()
					.date(LocalDate.now())
					.typeRendezVous(TypeRendezVous.Nettoyage)
					.dentist(dentistRepository.findById("az-cfffe--feeffvefev-vfv").get())
					.patient(patientRepository.findById("QWER-DEDE-ASDCCF-cefwfEWFE").get())
			.build());
	rendezVousRepository.save(RendezVous.builder()
			.date(LocalDate.now())
			.typeRendezVous(TypeRendezVous.Consultation)
			.dentist(dentistRepository.findById("az-cfffe--feeffvefev-vfv").get())
			.patient(patientRepository.findById("QWER-DEDE-ASDCCF-cefwfEWFE").get())
			.build());
	rendezVousRepository.save(RendezVous.builder()
			.date(LocalDate.now())
			.typeRendezVous(TypeRendezVous.Blanchiment)
			.dentist(dentistRepository.findById("ADRT-RTTEE-DDDED-VMNG").get())
			.patient(patientRepository.findById("QWER-DEDE-ASDCCF-cefwfEWFE").get())
			.build());

	PaymentType[] paymentTypes=PaymentType.values();
	Random random= new Random();
	rendezVousRepository.findAll().forEach(st->
			{
				for (int i = 0; i < 4; i++) {
					int index= random.nextInt(paymentTypes.length);
					Payment payment=Payment.builder()
							.amount(1000+(int) (Math.random()*2000))
							.type(paymentTypes[index])
							.status(PaymentStatus.CREATED)
							.date(LocalDate.now())
							.rendezVous(st)
							.build();
					paymentRepository.save(payment);
				}
			}
			);

		};


	}
}



