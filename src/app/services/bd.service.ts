import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IEvenement} from "../shared/evenement";
// @ts-ignore
import {Head, Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import { bdResponseEvent } from '../shared/bd';

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

}
