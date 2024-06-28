import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../../services/patients.service';
import { Sexe } from '../../model/patient.model';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.css'
})
export class NewPatientComponent {
  patientFormGroup!: FormGroup;
  sexe: string[] = [];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientsService
  ) {}

  ngOnInit(): void {
    this.sexe = Object.keys(Sexe).filter(key => isNaN(Number(key)));

    // Initialize the form with controls
    this.patientFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      sexe: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  savePatient(): void {
    if (this.patientFormGroup.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    // Récupérer les valeurs du formulaire
    const patientData = this.patientFormGroup.value;

    // Journaliser les données envoyées pour le débogage
    console.log('Sending patient data:', patientData);

    // Appeler le service pour enregistrer le patient
    this.patientService.savePatient(patientData).subscribe({
      next: () => {
        alert('Patient saved successfully!');
        this.patientFormGroup.reset();
      },
      error: err => {
        console.error('Error occurred:', err);
        alert('Failed to save patient. Please check the data and try again.');
      }
    });
  }
}
