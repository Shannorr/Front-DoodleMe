import {IEvenement} from "./evenement";

export interface ICreneau {
  evenement: IEvenement; //copie de l'objet comme ça accès à toutes les données de l'event (pas juste l'id de l'event)
  id: number;
  date: string;
  heureDebut: string;
  nbRepPositive: number;
}
