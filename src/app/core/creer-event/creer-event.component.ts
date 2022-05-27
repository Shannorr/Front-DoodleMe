import { Component, OnInit } from '@angular/core';
import {PartageData} from "../../shared/bdService";
import {Time} from "@angular/common";
import {bdDataService} from "../../services/bd.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {IPersonne} from "../../shared/personne";

@Component({
  selector: 'app-creer-event',
  templateUrl: './creer-event.component.html',
  styleUrls: ['./creer-event.component.css']
})
export class CreerEventComponent implements OnInit {
  pageTitle: string = "Création d'un événement";
  nom: string = "";
  description: string = "";
  creneau1: string = "";
  creneau2: string = "";
  user!: IPersonne;

  constructor(private donnesService: PartageData, private dataBD: bdDataService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
  }

  creation(): void{
    let eventCre = this.dataBD.creerEvent(this.nom, this.description, this.user.iduser);
    console.log(eventCre);
    if(this.creneau1 != "") {
      var date = this.creneau1.split("T")[0];
      var heure = this.creneau1.split("T")[1];
      if(eventCre != null) {
        //let creneau = this.dataBD.creerCreneau(date, heure, eventCre.id);
      }
      //ajouter réponse (user qui crée répond positivment à son creneau
    }
    if(this.creneau2 != "") {
      var date = this.creneau2.split("T")[0];
      var heure = this.creneau2.split("T")[1];
      if(eventCre != null) {
        //let creneau = this.dataBD.creerCreneau(date, heure, eventCre.id);
      }
      //ajouter réponse
    }
  }

}
