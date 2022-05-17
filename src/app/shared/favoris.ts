import {IPersonne} from "./personne";
import {IEvenement} from "./evenement";

export interface IFavoris {
  personne: IPersonne; //copie de l'objet comme ça accès à toutes les données de la personne (pas juste l'id de la personne)
  event: IEvenement; //copie de l'objet comme ça accès à toutes les données de l'event
}
