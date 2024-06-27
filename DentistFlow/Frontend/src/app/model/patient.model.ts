export interface Patient{

  id : string,
  firstName : string,
  lastName : string,
  sexe : Sexe,
  age: number
  telephone: string,
  emailL: string
}

export interface Antecedent{
  id: number,
  dateCreation: Date,
  description: string,
  file: string,
  patient:Patient
}

export enum Sexe{
  M,F
}
