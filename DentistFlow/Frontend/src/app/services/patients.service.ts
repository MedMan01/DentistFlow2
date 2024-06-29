import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Antecedent, Patient } from '../model/patient.model';
import { environment } from '../../environments/environment';
import { Rendezvous } from "../model/rendezvous.model";
import { Payment } from "../model/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private backendUrl = environment.backendHost;

  constructor(private http: HttpClient) {}

  public getAllAntecedents(): Observable<Array<Antecedent>> {
    return this.http.get<Array<Antecedent>>(`${this.backendUrl}/antecedents`)
      .pipe(
        catchError(this.handleError<Array<Antecedent>>('getAllAntecedents', []))
      );
  }

  public getAllPatients(): Observable<Array<Patient>> {
    return this.http.get<Array<Patient>>(`${this.backendUrl}/patients`)
      .pipe(
        catchError(this.handleError<Array<Patient>>('getAllPatients', []))
      );
  }

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
    return this.http.post<Antecedent>(`${this.backendUrl}/antecedents`, formData)
      .pipe(
        catchError(this.handleError<Antecedent>('saveAntecedent' ))
      );
  }

  public savePatient(patientData: any): Observable<Patient> {
    return this.http.post<Patient>(`${this.backendUrl}/patients`, patientData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(this.handleError<Patient>('savePatient' ))
    );
  }

  public getCountPatients(): Observable<number> {
    return this.http.get<number>(`${this.backendUrl}/patientCount`)
      .pipe(
        catchError(this.handleError<number>('getCountPatients'))
      );
  }

  public getCountSalles(): Observable<number> {
    return this.http.get<number>(`${this.backendUrl}/SalleCount`)
      .pipe(
        catchError(this.handleError<number>('getCountSalles'))
      );
  }





  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Renvoyer un résultat vide pour que l'application continue à fonctionner.
      return new Observable<T>(subscriber => {
        subscriber.next(result as T);
        subscriber.complete();
      });
    };
  }
}
