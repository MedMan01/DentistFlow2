import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public payments: any;
  public dataSource: any;
  public displayedColumns:string[] =['id','date','amount','type','status','typeRendezVous']
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get("http://localhost:9090/payments")
      .subscribe({
        next : data => {
          this.payments = data;
          this.dataSource=new MatTableDataSource(this.payments)
        },
        error: err => {
          console.log(err)
        }
      })
  }

}
