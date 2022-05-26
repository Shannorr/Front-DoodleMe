import { IEvenement } from "./evenement";

export interface bdResponseEvent {
  msg : string;
  data : IEvenement[];
}