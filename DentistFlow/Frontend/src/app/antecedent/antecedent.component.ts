import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {PatientsService} from "../services/patients.service";

@Component({
  selector: 'app-antecedent',
  templateUrl: './antecedent.component.html',
  styleUrl: './antecedent.component.css'
})
export class AntecedentComponent implements  OnInit{
  public antecedent: any;
  public PatientdataSource: any;
  public displayedColumns:string[] =['id','dateCreation','firstname','Description']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private patientService:PatientsService) {
  }
  ngOnInit() {
    this.patientService.getAllAntecedents()
      .subscribe({
        next : data => {
          this.antecedent = data;
          this.PatientdataSource=new MatTableDataSource(this.antecedent);
          this.PatientdataSource.paginator=this.paginator;
          this.PatientdataSource.sort=this.sort;

        },
        error: err => {
          console.log(err)
        }
      })
  }

}
