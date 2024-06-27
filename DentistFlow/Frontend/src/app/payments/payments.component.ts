import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Patient} from "../model/patient.model";
import {Payment} from "../model/payment.model";
import {PaymentsService} from "../services/payments.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public payments!: Array<Payment>;
  public dataSource!: MatTableDataSource<Payment>;
  public displayedColumns:string[] =['id','date','amount','type','status','typeRendezVous']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private paymentService:PaymentsService) {
  }
  ngOnInit() {
this.paymentService.getAllPayments().subscribe({
        next : data => {
          this.payments = data;
          this.dataSource=new MatTableDataSource(this.payments);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;

        },
        error: err => {
          console.log(err)
        }
      })
  }

}
