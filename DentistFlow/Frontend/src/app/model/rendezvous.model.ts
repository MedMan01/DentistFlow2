import {Patient} from "./patient.model";
import {Dentist} from "./dentist.model";

export interface Rendezvous{
  id: number,
  date: Date,
  typeRendezvous: TypeRendezVous
  patient: Patient,
  dentist: Dentist
}

export enum TypeRendezVous{
  Consultation,Nettoyage,Extraction,Blanchiment
}
