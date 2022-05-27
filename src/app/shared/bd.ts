import { IEvenement } from "./evenement";
import {ICreneau} from "./creneau";

export interface bdResponseEvent {
  msg : string;
  data : IEvenement[];
}

export interface bdResponseCreneau {
  msg : string;
  data : ICreneau[];
}
