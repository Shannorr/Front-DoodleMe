import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IEvenement} from "../shared/evenement";
// @ts-ignore
import {Head, Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {
  bdResponseCloture,
  bdResponseCreneau,
  bdResponseEvent,
  bdResponsePersonne,
  bdResponseReponse
} from '../shared/bd';
import {ICreneau} from "../shared/creneau";

@Injectable({
  providedIn: 'root'
})
export class bdDataService {
  private url = 'http://localhost:8080/api';
  private token = this.tokenStorageService.getToken();
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) { }

  public recupererEvent(): Observable<bdResponseEvent> {
    return this.httpClient.get<bdResponseEvent>(this.url + '/events', this.httpOptions);
  }

  public recupererEventCreer(idU: number): Observable<bdResponseEvent> {
    return this.httpClient.get<bdResponseEvent>(this.url + '/events/created/' + idU, this.httpOptions);
  }

  public recupererLastEventCreerByUser(idU: number): Observable<bdResponseEvent> {
    return this.httpClient.get<bdResponseEvent>(this.url + '/events/last/' + idU, this.httpOptions);
  }

  public recupererEventRepondu(idU: number): Observable<bdResponseReponse> {
    return this.httpClient.get<bdResponseReponse>(this.url + '/users/reponse/' + idU, this.httpOptions);
  }

  public recupererEventById(idE: number): Observable<bdResponseEvent> {
    return this.httpClient.get<bdResponseEvent>(this.url + '/events/' + idE, this.httpOptions);
  }

  public recupererCreneauByEventId(idE: number): Observable<bdResponseCreneau> {
    return this.httpClient.get<bdResponseCreneau>(this.url + '/creneau/' + idE, this.httpOptions);
  }

  public recupererCreneauPrefByEventId(idE: number): Observable<bdResponseCreneau> {
    return this.httpClient.get<bdResponseCreneau>(this.url + '/creneau/winner/' + idE, this.httpOptions);
  }

  public recupererFavorisUser(id: number): Observable<bdResponseEvent> {
    return this.httpClient.get<bdResponseEvent>(this.url + '/favoris/event/' + id, this.httpOptions);
  }

  public recupererUserRepondantCreneau(idC: number): Observable<bdResponsePersonne> {
    return this.httpClient.get<bdResponsePersonne>(this.url + '/users/creneau/' + idC, this.httpOptions);
  }

  public recupCreneauById(idC: number): Observable<bdResponseCreneau> {
    return this.httpClient.get<bdResponseCreneau>(this.url + '/creneau/creneau/' + idC, this.httpOptions);
  }

  public ajouterFavoris(idU: number, idE: number): void{
    this.httpClient.post<bdResponseEvent>(this.url + '/favoris', {
          "idEvent": idE,
          "idUser": idU
        }, this.httpOptions).subscribe(
      (response: bdResponseEvent) => {console.log(response);},
      (error: string) => {console.log('Erreur ajout');}
    )
  }

  public deleteFavoris(idU: number, idE: number): void{
    const options = {
      body : {
        "idUser": idU,
        "idEvent": idE
      },
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
    this.httpClient.request<bdResponseEvent>('delete',this.url + '/favoris', options).subscribe(
      (response: bdResponseEvent) => {console.log(response);},
      (error: string) => {console.log('Erreur suppression');}
    )
  }

  public async creerEvent(nom: string, description: string, idCreateur: number, creneau: any[]): Promise<void> {
    await this.httpClient.post<bdResponseEvent>(this.url + '/events', {
      "name": nom,
      "description": description,
      "cloture": false,
      "idcreator": idCreateur,
      "creneauTab": creneau
    }, this.httpOptions).subscribe(
      (response: bdResponseEvent) => {console.log(response.data)},
      (error: string) => {console.log('Erreur ajout');}
    )
  }

  public async creerCreneau(date: string, heuredebut: string, idE: number): Promise<void>{
    await this.httpClient.post<bdResponseCreneau>(this.url + '/creneau', {
      "date": date,
      "heureDebut": heuredebut,
      "idEvent": idE
    }, this.httpOptions).subscribe(
      (response: bdResponseCreneau) => {console.log(response.data)},
      (error: string) => {console.log('Erreur ajout');}
    )
  }

  public async ajouterReponse(idCreneau: number, idUser: number, reponse: boolean): Promise<void>{
    await this.httpClient.post<bdResponseReponse>(this.url + '/reponse', {
      "idCreneau": idCreneau,
      "idUser": idUser,
      "reponse": reponse
    }, this.httpOptions).subscribe(
      (response: bdResponseReponse) => {console.log(response.data)},
      (error: string) => {console.log('Erreur ajout');}
    )
  }

  public async clotureEvent(idE: number): Promise<void> {
    const options = {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
    await this.httpClient.request<bdResponseCloture>('patch', this.url + '/events/' + idE, options).subscribe(
      (response: bdResponseCloture) => {console.log(response.msg);},
      (error: string) => {console.log('Erreur cloture');}
    )
  }
}
