import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Antecedent, Patient} from "../model/patient.model";
import {catchError} from "rxjs/operators";
import {Dentist} from "../model/dentist.model";
import {Salle} from "../model/salle.model";
import {Rendezvous} from "../model/rendezvous.model";

@Injectable({
  providedIn: 'root'
})
export class DentistsService {
  private backendUrl = environment.backendHost;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les antécédents
   * @returns Observable d'un tableau d'Antecedents
   */
  public getAllDentists(): Observable<Array<Dentist>> {
    return this.http.get<Array<Dentist>>(`${this.backendUrl}/dentists`)
      .pipe(
        catchError(this.handleError<Array<Dentist>>('getAllDentists', []))
      );
  }
  public getAllSalles(): Observable<Array<Salle>> {
    return this.http.get<Array<Salle>>(`${this.backendUrl}/salles`)
      .pipe(
        catchError(this.handleError<Array<Salle>>('getAllSalles', []))
      );
  }

  public getAllRendezVous(): Observable<Array<Rendezvous>> {
    return this.http.get<Array<Rendezvous>>(`${this.backendUrl}/rendezVous`)
      .pipe(
        catchError(this.handleError<Array<Rendezvous>>('getAllRendezVous', []))
      );
  }
  public getDentistRendezVous(code: string): Observable<Array<Rendezvous>> {
    return this.http.get<Array<Rendezvous>>(`${this.backendUrl}/dentists/${code}/rendezvous`)
      .pipe(
        catchError(this.handleError<Array<Rendezvous>>('getDentistRendezVous', []))
      );
  }











  /**
   * Gestion des erreurs HTTP
   * @param operation - nom de l'opération qui a échoué
   * @param result - valeur facultative à renvoyer comme résultat observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console instead

      // Renvoyer un résultat vide pour que l'application continue à fonctionner.
      return new Observable<T>(subscriber => {
        subscriber.next(result as T);
        subscriber.complete();
      });
    };
  }
}
