import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IEvenement} from "../shared/evenement";
// @ts-ignore
import {Head, Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {bdResponseCreneau, bdResponseEvent} from '../shared/bd';
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

  public recupererEventById(idE: number): Observable<bdResponseEvent> {
    return this.httpClient.get<bdResponseEvent>(this.url + '/events/' + idE, this.httpOptions);
  }

  public recupererCreneauByEventId(idE: number): Observable<bdResponseCreneau> {
    return this.httpClient.get<bdResponseCreneau>(this.url + '/creneau/' + idE, this.httpOptions);
  }

  public recupererFavorisUser(id: number): Observable<bdResponseEvent> {
    return this.httpClient.get<bdResponseEvent>(this.url + '/favoris/event/' + id, this.httpOptions);
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

  public creerEvent(nom: string, description: string, idCreateur: number): void {
    this.httpClient.post<bdResponseEvent>(this.url + '/events', {
      "name": nom,
      "description": description,
      "cloture": false,
      "idcreator": idCreateur
    }, this.httpOptions).subscribe(
      (response: bdResponseEvent) => {console.log(response.data)},
      (error: string) => {console.log('Erreur ajout');}
    )
  }

  public creerCreneau(date: string, heuredebut: string, idE: number): void{
    this.httpClient.post<bdResponseEvent>(this.url + '/events', {
      "date": date,
      "heureDebut": heuredebut,
      "idEvent": idE
    }, this.httpOptions).subscribe(
      (response: bdResponseEvent) => {console.log(response.data)},
      (error: string) => {console.log('Erreur ajout');}
    )
  }

}
