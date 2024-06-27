import {Rendezvous} from "./rendezvous.model";

export interface Payment{
  id: number,
  date: Date,
  amount: number,
  paymentType: PaymentType,
  paymentStatus: PaymentStatus,
  file: string,
  rendezvous: Rendezvous
}
export enum PaymentType{
  CASH, CHECK, TRANSFER, DEPOSIT
}
export enum PaymentStatus{
  CREATED, VALIDATED, REJECTED
}
