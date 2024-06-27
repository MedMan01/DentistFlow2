import {Component, OnInit} from '@angular/core';
import {Antecedent} from "../model/patient.model";
import {Rendezvous} from "../model/rendezvous.model";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {PatientsService} from "../services/patients.service";
import {DentistsService} from "../services/dentists.service";
import {Dentist} from "../model/dentist.model";

@Component({
  selector: 'app-dentist-details',
  templateUrl: './dentist-details.component.html',
  styleUrl: './dentist-details.component.css'
})
export class DentistDetailsComponent implements OnInit{
  public dentistCode!: string;
  public dentistRendezvous: Array<Rendezvous> = [];
  public rendezvoussDataSource = new MatTableDataSource<Rendezvous>();
  public displayedColumnsRendezvous: string[] = ['id', 'date', 'typeRendezVous'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private dentistService: DentistsService
  ) {}
  ngOnInit(): void {
    // Récupère l'ID du patient depuis les paramètres de l'URL
    this.dentistCode = this.activatedRoute.snapshot.paramMap.get('code')!;

    // Récupère les antécédents du patient via le service
    this.dentistService.getDentistRendezVous(this.dentistCode).subscribe({
      next: (rendezvous: Rendezvous[]) => {
        this.dentistRendezvous = rendezvous;
        this.rendezvoussDataSource = new MatTableDataSource<Rendezvous>(this.dentistRendezvous);
      },
      error: err => {
        console.error('Error fetching patient antecedents', err);
      }
    });


  }
}
