import { IEvenement } from "./evenement";
import {ICreneau} from "./creneau";
import {IReponse} from "./reponse";
import {IPersonne} from "./personne";

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
  data : IPersonne[];
}

export interface bdResponseCloture {
  msg : string;
}
