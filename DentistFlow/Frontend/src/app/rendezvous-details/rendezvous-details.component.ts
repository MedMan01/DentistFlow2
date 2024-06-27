import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentsService } from '../services/payments.service';
import { Payment } from '../model/payment.model';

@Component({
  selector: 'app-rendezvous-details',
  templateUrl: './rendezvous-details.component.html',
  styleUrls: ['./rendezvous-details.component.css']
})
export class RendezvousDetailsComponent implements OnInit {
  public rendezVousId!: string;
  public paymentsDataSource = new MatTableDataSource<Payment>();
  public displayedColumnsPayment: string[] = ['id', 'date', 'amount', 'type', 'status'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.rendezVousId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.paymentService.getRendezVousPayment(this.rendezVousId).subscribe({
      next: (payments: Payment[]) => {
        this.paymentsDataSource.data = payments;
      },
      error: err => {
        console.error('Error fetching payments', err);
      }
    });
  }
}
