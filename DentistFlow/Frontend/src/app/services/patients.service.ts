import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Antecedent, Patient } from '../model/patient.model';
import { environment } from '../../environments/environment';
import {Rendezvous} from "../model/rendezvous.model";
import {Payment} from "../model/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private backendUrl = environment.backendHost;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les antécédents
   * @returns Observable d'un tableau d'Antecedents
   */
  public getAllAntecedents(): Observable<Array<Antecedent>> {
    return this.http.get<Array<Antecedent>>(`${this.backendUrl}/antecedents`)
      .pipe(
        catchError(this.handleError<Array<Antecedent>>('getAllAntecedents', []))
      );
  }

  /**
   * Récupère tous les patients
   * @returns Observable d'un tableau de Patients
   */
  public getAllPatients(): Observable<Array<Patient>> {
    return this.http.get<Array<Patient>>(`${this.backendUrl}/patients`)
      .pipe(
        catchError(this.handleError<Array<Patient>>('getAllPatients', []))
      );
  }

  /**
   * Récupère les antécédents d'un patient par son ID
   * @param id ID du patient
   * @returns Observable d'un tableau d'Antecedents
   */
  public getPatientAntecedents(id: string): Observable<Array<Antecedent>> {
    return this.http.get<Array<Antecedent>>(`${this.backendUrl}/patients/${id}/antecedents`)
      .pipe(
        catchError(this.handleError<Array<Antecedent>>('getPatientAntecedents', []))
      );
  }
  public getPatientRendezVous(id: string): Observable<Array<Rendezvous>> {
    return this.http.get<Array<Rendezvous>>(`${this.backendUrl}/patients/${id}/rendezvous`)
      .pipe(
        catchError(this.handleError<Array<Rendezvous>>('getPatientRendezVous', []))
      );
  }

  public saveAntecedent(formData: any): Observable<Antecedent> {
    return this.http.post<Antecedent>(`${this.backendUrl}/antecedents`,formData)
      .pipe(
        catchError(this.handleError<Antecedent>('saveAntecedent' ))
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
