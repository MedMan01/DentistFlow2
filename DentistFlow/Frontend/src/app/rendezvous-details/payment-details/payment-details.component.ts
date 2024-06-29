import {Component, OnInit} from '@angular/core';
import {DentistsService} from "../../services/dentists.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{

  paymentId! : number;
  pdfFileUrl: any;
  constructor(private dentistsService: DentistsService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.paymentId=this.route.snapshot.params['id'];
    this.dentistsService.getPaymentDetails(this.paymentId).subscribe({
      next:value => {
        let bolb= new Blob([value],{type: 'application/pdf'});
        this.pdfFileUrl=window.URL.createObjectURL(bolb);
      },error: err => {
        console.log(err);
      }
      });
  }

  afterLoadComplete(event:any) {

  }
}
