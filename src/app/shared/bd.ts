import { IEvenement } from "./evenement";
import {ICreneau} from "./creneau";
import {IReponse} from "./reponse";

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

export interface bdResponseCloture {
  msg : string;
}
