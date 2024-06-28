import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientsService} from "../../services/patients.service";
import {Sexe} from "../../model/patient.model";
import {DentistsService} from "../../services/dentists.service";

@Component({
  selector: 'app-new-dentist',
  templateUrl: './new-dentist.component.html',
  styleUrl: './new-dentist.component.css'
})
export class NewDentistComponent {
  dentistFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dentistService: DentistsService
  ) {}

  ngOnInit(): void {

    // Initialize the form with controls
    this.dentistFormGroup = this.fb.group({
      code: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  saveDentist(): void {
    if (this.dentistFormGroup.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Récupérer les valeurs du formulaire
    const patientData = this.dentistFormGroup.value;

    // Journaliser les données envoyées pour le débogage
    console.log('Sending dentist data:', patientData);

    // Appeler le service pour enregistrer le patient
    this.dentistService.saveDentist(patientData).subscribe({
      next: () => {
        alert('Dentist saved successfully!');
        this.dentistFormGroup.reset();
      },
      error: err => {
        console.error('Error occurred:', err);
        alert('Failed to save Dentist. Please check the data and try again.');
      }
    });
  }
}
