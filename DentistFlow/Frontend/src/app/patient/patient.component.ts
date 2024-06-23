import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-Patient',
  templateUrl: './Patient.component.html',
  styleUrl: './Patient.component.css'
})
export class PatientComponent implements OnInit{
  public patient: any;
  public dataSource: any;
  public displayedColumns:string[] =['id','firstName','lastName','sexe','age','telephone','email']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.http.get("http://localhost:9090/patients")
      .subscribe({
        next : data => {
          this.patient = data;
          this.dataSource=new MatTableDataSource(this.patient);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;

        },
        error: err => {
          console.log(err)
        }
      })
  }

}
