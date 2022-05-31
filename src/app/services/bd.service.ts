import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {IEvenement} from "../shared/evenement";
// @ts-ignore
import {catchError, Head, Observable, throwError} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {
  bdResponseCloture,
  bdResponseCreneau,
  bdResponseEvent,
  bdResponsePersonne,
  bdResponseReponse
} from '../shared/bd';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


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

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService, private router: Router) { }

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
      (response: bdResponseEvent) => {
        this.popupAjoutFavoris("Favoris est ajouté");
      },
      (error: HttpErrorResponse) => {this.handleError(error, "Le favoris")}
    )
  }

  private popupAjoutFavoris(message : string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      width: 300,
      showConfirmButton: false,
      timer: 1500,
      backdrop: `
          rgba(0,0,123,0.4)
          url("../../assets/img/oiseau.gif")
          left top
          no-repeat
        `
    })
  }

  private popupDeleteFavoris(message : string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      width: 300,
      showConfirmButton: false,
      timer: 1500,
      backdrop: `
          rgba(0,0,123,0.4)
          url("../../assets/img/smiley.gif")
          left top
          no-repeat
        `
    })
  }

  private handleError(error: HttpErrorResponse, message: String) {
    if (error.status === 304) {
      // A client-side or network error occurred. Handle it accordingly.
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: message + ' a déjà été ajouté',
        width: 300,
        showConfirmButton: false,
        timer: 1700,
        backdrop: `
          rgba(0,0,123,0.4)
          url("../../assets/img/spiderman.gif")
          left top
          no-repeat
        `
      })
    }else if (error.status === 401) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        width: 300,
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
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
      (response: bdResponseEvent) => {this.popupDeleteFavoris("Le favoris a été supprimer")},
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
      (response: bdResponseEvent) => {
        this.reloadPage ();
        this.router.navigate(['/evenements']);},
      (error: HttpErrorResponse) => {this.handleError(error, "Le nom event est déjà utilisé");}
    )
  }
  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
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
