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

			// Create 10 patients with unique names
			for (int i = 1; i <= 10; i++) {
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

				// Create 5 antecedents for each patient
				for (int j = 0; j < 5; j++) {
					Antecedent antecedent = Antecedent.builder()
							.dateCreation(LocalDate.now().minusDays(random.nextInt(365)))
							.description("Antecedent Description " + (j + 1))
							.patient(patient)
							.build();
					antecedentRepository.save(antecedent);
				}
			}

			// Create 5 dentists with unique names
			for (int i = 1; i <= 5; i++) {
				Dentist dentist = Dentist.builder()
						.id(UUID.randomUUID().toString())
						.code("D" + i)
						.firstName("DentistFirstName" + i)
						.lastName("DentistLastName" + i)
						.build();
				dentistRepository.save(dentist);
			}

			// Create multiple rendezvous and payments for each patient
			patientRepository.findAll().forEach(pt -> {
				Dentist dentist = dentistRepository.findAll().get(random.nextInt(5)); // Select a dentist randomly
				for (int k = 0; k < 3; k++) {
					RendezVous rendezVous = RendezVous.builder()
							.date(LocalDate.now().minusDays(random.nextInt(30)))
							.typeRendezVous(TypeRendezVous.values()[random.nextInt(TypeRendezVous.values().length)])
							.dentist(dentist)
							.patient(pt)
							.build();
					rendezVousRepository.save(rendezVous);

					// Create 2 payments for each rendezvous
					for (int j = 0; j < 2; j++) {
						PaymentType[] paymentTypes = PaymentType.values();
						int index = random.nextInt(paymentTypes.length);
						Payment payment = Payment.builder()
								.amount(1000 + random.nextInt(2000))
								.type(paymentTypes[index])
								.status(PaymentStatus.values()[random.nextInt(PaymentStatus.values().length)])
								.date(LocalDate.now().minusDays(random.nextInt(30)))
								.rendezVous(rendezVous)
								.build();
						paymentRepository.save(payment);
					}
				}
			});

			// Create 40 salles
			String[] salleNumbers = {"A", "B", "C", "D"};
			for (int i = 1; i <= 40; i++) {
				Salle salle = Salle.builder()
						.numeroSalle(salleNumbers[random.nextInt(salleNumbers.length)] + String.format("%02d", i))
						.etatSalle(i % 2 == 0 ? EtatSalle.Disponible : EtatSalle.NonDisponible)
						.typeSalle(TypeSalle.values()[random.nextInt(TypeSalle.values().length)])
						.build();
				salleRepository.save(salle);
			}
		};
	}
}
