import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PatientsService} from "../services/patients.service";
import {MatTableDataSource} from "@angular/material/table";
import {DentistsService} from "../services/dentists.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public PatientdataSource: any;
  public displayedColumns:string[] =['patient','rendezvous','dentist','salle']

  public patientCount: number = 0;
  public rendezvousCount: number = 0;
  public dentistCount: number = 0;
  public salleCount: number = 0;

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! :MatSort;
  constructor(private patientService: PatientsService,
              private dentistsService: DentistsService) {
  }
  ngOnInit() {
    // Récupérer le nombre de patients
    this.patientService.getCountPatients().subscribe(count => {
      this.patientCount = count;
    });

    // Récupérer le nombre de Salles
    this.patientService.getCountSalles().subscribe(count => {
      this.salleCount = count;
    });

    // Récupérer le nombre de dentists
    this.dentistsService.getCountDentists().subscribe(count => {
      this.dentistCount = count;
    });

    // Récupérer le nombre de dentists
    this.dentistsService.getCountRendezVous().subscribe(count => {
      this.rendezvousCount = count;
    });

  }

}
