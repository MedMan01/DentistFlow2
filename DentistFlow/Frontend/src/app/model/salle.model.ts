export interface Salle{
  id: number,
  numeroSalle: string,
  etatSalle: EtatSalle,
  typeSalle: TypeSalle
}
export enum EtatSalle{
  Disponible,
  NonDisponible
}
export enum TypeSalle{
  Réception,consultation,radiographie,Laboratoire,administratif,conférences

}
