import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PartageData} from "../../shared/bdService";
import {IPersonne} from "../../shared/personne";
import {IEvenement} from "../../shared/evenement";
import {IReponse} from "../../shared/reponse";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  pageTitle: string = "Profil de l'utilisateur";
  personne: IPersonne | undefined;
  eventCree: IEvenement[] = [];
  eventParticipe: IReponse[] = [];

  constructor(private route: ActivatedRoute,
              private donnesService: PartageData) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idU'));
    if(id >= 0){
      this.personne = this.donnesService.getPersonneInd(id);
    }
    var i = 0;
    while(i < this.donnesService.getTailleEvents()){
      if(this.donnesService.getEventInd(i).createur.id == id){
        this.eventCree.push(this.donnesService.getEventInd(i));
      }
      i++;
    }
    var j = 0;
    while(j < this.donnesService.getTailleReponse()){
      if(this.donnesService.getReponseInd(j).personne.id == id){
        this.eventParticipe.push(this.donnesService.getReponseInd(j));
      }
      j++;
    }
  }

}
