import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {PaymentStatus, PaymentType} from '../../model/payment.model';
import { PaymentsService } from '../../services/payments.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  paymentFormGroup!: FormGroup;
  rendezvousId!: string;
  selectedFile: File | null = null;
  paymentTypes: string[] = [];
  paymentStatus: string[] = [];
  pdfFileUrl!: string;
  showProgress: boolean=false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentsService
  ) {}

  ngOnInit(): void {
    // Initialiser les types de paiement à partir de l'énumération
    this.paymentTypes = Object.keys(PaymentType).filter(key => isNaN(Number(key)));
    this.paymentStatus = Object.keys(PaymentStatus).filter(key => isNaN(Number(key)));

    // Récupérer l'ID de rendez-vous depuis l'URL
    this.rendezvousId = this.activatedRoute.snapshot.params['rendezvousId'];

    // Initialiser le formulaire avec les contrôles
    this.paymentFormGroup = this.fb.group({
      date: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      status: ['', Validators.required],
      rendezvousId: [{ value: this.rendezvousId, disabled: true }, Validators.required],
      fileName: ['']
    });
  }

  // Méthode pour sélectionner le fichier
  selectfile(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.');
        return;
      }
      this.selectedFile = file;
      this.paymentFormGroup.patchValue({
        fileName: file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
    }
  }

  // Méthode pour sauvegarder le paiement
  savePayment(): void {
    this.showProgress=true;
    if (this.paymentFormGroup.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();

    // Formatage de la date
    const date = this.paymentFormGroup.value.date;
    const formattedDate = new Date(date).toISOString().split('T')[0]; // yyyy-MM-dd

    formData.append('date', formattedDate);
    formData.append('amount', this.paymentFormGroup.value.amount);
    formData.append('type', this.paymentFormGroup.value.type);
    formData.append('status', this.paymentFormGroup.value.status);
    formData.append('rendezvousId', this.rendezvousId); // Utiliser directement l'ID de rendez-vous

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    // Log pour voir ce qui est envoyé
    formData.forEach((value: FormDataEntryValue, key: string) => {
      console.log(key + ', ' + value);
    });

    this.paymentService.savePayment(formData).subscribe({
      next: () => {
        this.showProgress=false;
        alert('Payment Saved successfully!');
        // Réinitialiser le formulaire après succès

        this.paymentFormGroup.reset();
        this.selectedFile = null;
      },
      error: err => {
        console.log('Error occurred:', err);
        alert('Failed to save payment. Please check the data and try again.');
      }
    });
  }

  afterLoadComplete(event: any) {
    console.log(event);
  }
}
