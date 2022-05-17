import {ICreneau} from "./creneau";
import {IPersonne} from "./personne";

export interface IReponse {
  personne: IPersonne; //copie de l'objet comme ça accès à toutes les données de la personne (pas juste l'id de la personne)
  creneau: ICreneau; //copie de l'objet comme ça accès à toutes les données du créneau et donc de l'event car créneau possède l'event
  reponse: boolean;
}
