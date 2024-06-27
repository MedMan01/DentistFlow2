import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PatientsService} from "../services/patients.service";
import {Patient} from "../model/patient.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-Patient',
  templateUrl: './Patient.component.html',
  styleUrls: ['./Patient.component.css']
})
export class PatientComponent implements OnInit {
  public patients!: Array<Patient>;
  public dataSource!: MatTableDataSource<Patient>;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'sexe', 'age', 'telephone', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientsService, private router: Router) {}

  ngOnInit() {
    this.patientService.getAllPatients().subscribe({
      next: data => {
        this.patients = data;
        this.dataSource = new MatTableDataSource<Patient>(this.patients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  patientAntecedents(patient: Patient) {
    this.router.navigateByUrl(`/admin/patient-details/${patient.id}`);
  }

}
