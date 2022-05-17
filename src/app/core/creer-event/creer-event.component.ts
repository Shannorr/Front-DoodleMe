import { Component, OnInit } from '@angular/core';
import {PartageData} from "../../shared/bdService";
import {Time} from "@angular/common";

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

  constructor(private donnesService: PartageData) { }

  ngOnInit(): void {
  }

  creation(): void{
    this.donnesService.addEvent({id: this.donnesService.getTailleEvents(), nom: this.nom, description: this.description, cloture: false, createur:this.donnesService.getPersonneInd(0)});
    if(this.creneau1 != ""){
      var date = this.creneau1.split("T")[0];
      var heure = this.creneau1.split("T")[1];
      this.donnesService.addCreneau({evenement: this.donnesService.getEventInd(this.donnesService.getTailleEvents()-1),
        id: this.donnesService.getTailleCreneau(), date: date, heureDebut: heure, nbRepPositive: 1});
      this.donnesService.addReponse({reponse:true, personne: this.donnesService.getPersonneInd(0), creneau:this.donnesService.getCreneauInd(this.donnesService.getTailleCreneau()-1)});
    }
    if(this.creneau2 != ""){
      var date = this.creneau2.split("T")[0];
      var heure = this.creneau2.split("T")[1];
      this.donnesService.addCreneau({evenement: this.donnesService.getEventInd(this.donnesService.getTailleEvents()-1),
        id: this.donnesService.getTailleCreneau(), date: date, heureDebut: heure, nbRepPositive: 1});
      this.donnesService.addReponse({reponse:true, personne: this.donnesService.getPersonneInd(0), creneau:this.donnesService.getCreneauInd(this.donnesService.getTailleCreneau()-1)});
    }
  }

}
