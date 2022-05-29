import {ICreneau} from "./creneau";

export interface IReponse {
  creneau: ICreneau; //copie de l'objet comme ça accès à toutes les données du créneau et donc de l'event car créneau possède l'event
  reponse: boolean;
}
