import { IEvenement } from "./evenement";
import {ICreneau} from "./creneau";
import {IReponse} from "./reponse";
import {IReponseUser} from "./userReponse";

//interface utilisées pour les réponses du back
export interface bdResponseEvent {
  msg : string;
  data : IEvenement[];
}

export interface bdResponseCreneau {
  msg : string;
  data : ICreneau[];
}

export interface bdResponseReponse {
  msg : string;
  data : IReponse[];
}

export interface bdResponsePersonne {
  msg : string;
  data : IReponseUser[];
}

export interface bdResponseCloture {
  msg : string;
}
