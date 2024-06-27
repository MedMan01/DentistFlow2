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
										PaymentRepository paymentRepository) {
		return args -> {
			Random random = new Random();

			// Create 40 Patients
			for (int i = 1; i <= 40; i++) {
				Patient patient = Patient.builder()
						.id(UUID.randomUUID().toString())
						.firstName("PatientFirstName" + i)
						.lastName("PatientLastName" + i)
						.sexe(i % 2 == 0 ? Sexe.M : Sexe.F)
						.age(18 + random.nextInt(60))
						.telephone("06" + (10000000 + random.nextInt(90000000)))
						.email("patient" + i + "@example.com")
						.build();
				patientRepository.save(patient);
			}

			// Create 40 Antecedents for the created Patients
			patientRepository.findAll().forEach(pt -> {
				for (int i = 0; i < 10; i++) {
					Antecedent antecedent = Antecedent.builder()
							.dateCreation(LocalDate.now().minusDays(random.nextInt(365)))
							.description("Antecedent Description " + (i + 1))
							.patient(pt)
							.build();
					antecedentRepository.save(antecedent);
				}
			});

			// Create 40 Salles
			String[] salleNumbers = {"A", "B", "C", "D"};
			for (int i = 1; i <= 40; i++) {
				Salle salle = Salle.builder()
						.numeroSalle(salleNumbers[random.nextInt(salleNumbers.length)] + String.format("%02d", i))
						.etatSalle(i % 2 == 0 ? EtatSalle.Disponible : EtatSalle.NonDisponible)
						.typeSalle(TypeSalle.values()[random.nextInt(TypeSalle.values().length)])
						.build();
				salleRepository.save(salle);
			}

			// Create 40 Dentists
			for (int i = 1; i <= 40; i++) {
				Dentist dentist = Dentist.builder()
						.id(UUID.randomUUID().toString())
						.code("D" + i)
						.firstName("DentistFirstName" + i)
						.lastName("DentistLastName" + i)
						.build();
				dentistRepository.save(dentist);
			}

			// Create 40 RendezVous (linking Patients and Dentists)
			patientRepository.findAll().forEach(pt -> {
				dentistRepository.findAll().forEach(dentist -> {
					for (int i = 0; i < 5; i++) {
						RendezVous rendezVous = RendezVous.builder()
								.date(LocalDate.now().minusDays(random.nextInt(30)))
								.typeRendezVous(TypeRendezVous.values()[random.nextInt(TypeRendezVous.values().length)])
								.dentist(dentist)
								.patient(pt)
								.build();
						rendezVousRepository.save(rendezVous);
					}
				});
			});

			// Create 40 Payments for the created RendezVous
			PaymentType[] paymentTypes = PaymentType.values();
			rendezVousRepository.findAll().forEach(rdv -> {
				for (int i = 0; i < 1; i++) {
					int index = random.nextInt(paymentTypes.length);
					Payment payment = Payment.builder()
							.amount(1000 + (int) (Math.random() * 2000))
							.type(paymentTypes[index])
							.status(PaymentStatus.values()[random.nextInt(PaymentStatus.values().length)])
							.date(LocalDate.now().minusDays(random.nextInt(30)))
							.rendezVous(rdv)
							.build();
					paymentRepository.save(payment);
				}
			});
		};
	}
}
