import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PatientsService } from '../services/patients.service';
import { Antecedent } from '../model/patient.model';
import { MatTableDataSource } from '@angular/material/table';
import {Rendezvous} from "../model/rendezvous.model";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  public patientId!: string;
  public patientAntecedents: Array<Antecedent> = [];
  public patientRendezvous: Array<Rendezvous> = [];
  public antecedentsDataSource = new MatTableDataSource<Antecedent>();
  public rendezvoussDataSource = new MatTableDataSource<Rendezvous>();
  public displayedColumns: string[] = ['id', 'dateCreation', 'description'];
  public displayedColumnsRendezvous: string[] = ['id', 'date', 'typeRendezVous'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère l'ID du patient depuis les paramètres de l'URL
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id')!;

    // Récupère les antécédents du patient via le service
    this.patientService.getPatientAntecedents(this.patientId).subscribe({
      next: (antecedents: Antecedent[]) => {
        this.patientAntecedents = antecedents;
        this.antecedentsDataSource = new MatTableDataSource<Antecedent>(this.patientAntecedents);
      },
      error: err => {
        console.error('Error fetching patient antecedents', err);
      }
    });

    // Récupère les rendezvous du patient via le service
    this.patientService.getPatientRendezVous(this.patientId).subscribe({
      next: (rendezvous: Rendezvous[]) => {
        this.patientRendezvous = rendezvous;
        this.rendezvoussDataSource = new MatTableDataSource<Rendezvous>(this.patientRendezvous);
      },
      error: err => {
        console.error('Error fetching patient rendezvous', err);
      }
    });
  }

  newAntecedent() {
    this.router.navigateByUrl(`/admin/new-antecedent/${this.patientId}`)

  }
}
