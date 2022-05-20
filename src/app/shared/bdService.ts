import {Injectable} from "@angular/core";
import {IEvenement} from "./evenement";
import {IPersonne} from "./personne";
import {ICreneau} from "./creneau";
import {IReponse} from "./reponse";
import {IFavoris} from "./favoris";

@Injectable({
  providedIn: "root"
})
export class PartageData {
  events: IEvenement[] = [] ;
  personnes: IPersonne[] = [] ;
  creneaux: ICreneau[] = [] ;
  reponses: IReponse[] = [] ;
  favoris: IFavoris[] = [];

  constructor() { }

  //pour les events
  addEvent(data: IEvenement): void {
    this.events.push(data);
  }

  getEvents(): IEvenement[] {
    return this.events;
  }

  clotureEvent(creneau: ICreneau): void{
    this.events[creneau.evenement.id].cloture = true;
  }

  getEventInd(index: number): IEvenement {
    return this.events[index];
  }

  deleteEvent(index: number): IEvenement[] {
    this.events.splice(index,1);
    return this.events;
  }

  getTailleEvents(): number{
    return this.events.length;
  }

  //pour les personnes
  addPersonne(data: IPersonne): void {
    this.personnes.push(data);
  }

  getPersonne(): IPersonne[] {
    return this.personnes;
  }

  getPersonneInd(index: number): IPersonne {
    return this.personnes[index];
  }

  deletePersonne(index: number): IPersonne[] {
    this.personnes.splice(index,1);
    return this.personnes;
  }

  getTaillePersonne(): number{
    return this.personnes.length;
  }

  //pour les créneaux
  addCreneau(data: ICreneau): void {
    this.creneaux.push(data);
  }

  getCreneaux(): ICreneau[] {
    return this.creneaux;
  }

  getCreneauInd(index: number): ICreneau {
    return this.creneaux[index];
  }

  deleteCreneau(index: number): ICreneau[] {
    this.creneaux.splice(index,1);
    return this.creneaux;
  }

  getTailleCreneau(): number{
    return this.creneaux.length;
  }

  //pour les reponses
  addReponse(data: IReponse): void {
    this.reponses.push(data);
  }

  getReponse(): IReponse[] {
    return this.reponses;
  }

  getReponseInd(index: number): IReponse {
    return this.reponses[index];
  }

  deleteReponse(index: number): IReponse[] {
    this.reponses.splice(index,1);
    return this.reponses;
  }

  getTailleReponse(): number{
    return this.reponses.length;
  }

  //pour les favoris
  addFavoris(data: IFavoris): void {
    this.favoris.push(data);
  }

  getFavoris(): IFavoris[] {
    return this.favoris;
  }

  getFavorisInd(index: number): IFavoris {
    return this.favoris[index];
  }

  deleteFavoris(index: number): IFavoris[] {
    this.favoris.splice(index,1);
    return this.favoris;
  }

  getTailleFavoris(): number{
    return this.favoris.length;
  }
}

