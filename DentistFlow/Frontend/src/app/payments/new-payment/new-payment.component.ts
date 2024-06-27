import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {elementAt} from "rxjs";
import {PaymentType} from "../../model/payment.model";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  paymentFormGroup!: FormGroup;
  rendezvousId!: string;
  selectedFile!: File;
  paymentTypes: string[]=[];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    for (let elt in PaymentType){
      let value=PaymentType[elt];
      if(typeof value=='string') {
        this.paymentTypes.push(value);
      }
    }
    this.rendezvousId = this.activatedRoute.snapshot.params['rendezvousId'];
    this.paymentFormGroup = this.fb.group({
      date: this.fb.control(''),
      amount: this.fb.control(''),
      type: this.fb.control(''),
      rendezvousId: this.fb.control(this.rendezvousId),
      fileSource: this.fb.control(''),
      fileName: this.fb.control(''),


      // file is handled separately, not as a form control
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  selectfile($event: any ) {

  }
}
