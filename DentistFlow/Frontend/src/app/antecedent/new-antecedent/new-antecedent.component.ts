import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PatientsService } from "../../services/patients.service";

@Component({
  selector: 'app-new-antecedent',
  templateUrl: './new-antecedent.component.html',
  styleUrls: ['./new-antecedent.component.css']
})
export class NewAntecedentComponent {
  antecedentFormGroup!: FormGroup;
  patientId!: string;
  selectedFile: File | null = null;
  pdfFileUrl!: string;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientsService
  ) {}

  ngOnInit(): void {
    // Get the patientId from the route parameters
    this.patientId = this.activatedRoute.snapshot.params['patientId'];

    // Initialize the form with controls
    this.antecedentFormGroup = this.fb.group({
      description: ['', Validators.required], // Ensure 'description' field is required
      patientId: [{ value: this.patientId, disabled: true }, Validators.required], // Use patientId from route params and disable input
      fileName: ['']
    });
  }

  // Method to select a file
  selectfile(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.');
        return;
      }
      this.selectedFile = file;
      this.antecedentFormGroup.patchValue({
        fileName: file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  // Method to save the antecedent
  saveAntecedent(): void {
    if (this.antecedentFormGroup.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.antecedentFormGroup.value.description); // Corrected 'amount' to 'description'
    formData.append('patientId', this.patientId);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    // Log what is being sent
    formData.forEach((value: FormDataEntryValue, key: string) => {
      console.log(key + ', ' + value);
    });

    // Call the service to save the antecedent
    this.patientService.saveAntecedent(formData).subscribe({
      next: () => {
        alert('Antecedent saved successfully!');
        this.antecedentFormGroup.reset();
        this.selectedFile = null;
      },
      error: err => {
        console.error('Error occurred:', err);
        alert('Failed to save antecedent. Please check the data and try again.');
      }
    });
  }
}
