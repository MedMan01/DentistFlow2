import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dentist} from "../model/dentist.model";
import {catchError} from "rxjs/operators";
import {Salle} from "../model/salle.model";
import {Rendezvous} from "../model/rendezvous.model";
import {Antecedent} from "../model/patient.model";
import {Payment} from "../model/payment.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private backendUrl = environment.backendHost;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les antécédents
   * @returns Observable d'un tableau d'Antecedents
   */
  public getAllPayments(): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(`${this.backendUrl}/payments`)
      .pipe(
        catchError(this.handleError<Array<Payment>>('getAllPayments', []))
      );
  }
  public getRendezVousPayment(id: string): Observable<Array<Payment>> {
    return this.http.get<Array<Payment>>(`${this.backendUrl}/rendezvous/${id}/payment`)
      .pipe(
        catchError(this.handleError<Array<Payment>>('getRendezVousPayment', []))
      );
  }

  public savePayment(formData: any): Observable<Payment> {
    return this.http.post<Payment>(`${this.backendUrl}/payments`,formData)
      .pipe(
        catchError(this.handleError<Payment>('savePayment' ))
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
