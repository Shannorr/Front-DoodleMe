import { Component, OnInit } from '@angular/core';
import {PartageData} from "../../shared/bdService";
import {ActivatedRoute, Router} from "@angular/router";
import {IEvenement} from "../../shared/evenement";
import {ICreneau} from "../../shared/creneau";
import {bdResponseCreneau, bdResponseEvent} from "../../shared/bd";
import {bdDataService} from "../../services/bd.service";


@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
  pageTitle: string = "Détail de l'événement";
  event: IEvenement | undefined;
  creneauxEvent: ICreneau[] = [];
  creneauNew: string = "";
  idEvent: number = -1000;
  creneauPref: ICreneau | undefined;

  constructor(private route: ActivatedRoute,
              private donnesService: PartageData,
              private router: Router,
              private dataBD: bdDataService) { }

  ngOnInit(): void {
    this.idEvent = Number(this.route.snapshot.paramMap.get('idE'));
    if(this.idEvent >= 0) {
      this.dataBD.recupererEventById(this.idEvent).subscribe((data: bdResponseEvent) => {
        this.event = data.data[0];
      });
      this.dataBD.recupererCreneauByEventId(this.idEvent).subscribe((data: bdResponseCreneau) => {
        this.creneauxEvent = data.data;
      });
      var i = 0;
      while (i < this.donnesService.getTailleCreneau()) {
        if (this.donnesService.getCreneauInd(i).evenement.id == this.idEvent) {
          this.creneauxEvent.push(this.donnesService.getCreneauInd(i));
          if (this.creneauPref == undefined) {
            this.creneauPref = this.donnesService.getCreneauInd(i);
          } else {
            if (this.donnesService.getCreneauInd(i).nbRepPositive > this.creneauPref.nbRepPositive) {
              this.creneauPref = this.donnesService.getCreneauInd(i);
            }
          }
        }
        i++;
      }
    }
  }

  creerNewCreneau(): void{
    if(this.creneauNew != ""){
      var date = this.creneauNew.split("T")[0];
      var heure = this.creneauNew.split("T")[1];
      this.donnesService.addCreneau({evenement: this.donnesService.getEventInd(this.idEvent),
        id: this.donnesService.getTailleCreneau(), date: date, heureDebut: heure, nbRepPositive: 1});
      this.creneauxEvent.push(this.donnesService.getCreneauInd(this.donnesService.getTailleCreneau()-1));
      this.donnesService.addReponse({creneau: this.donnesService.getCreneauInd(this.donnesService.getTailleCreneau()-1), reponse: true,
        personne: this.donnesService.getPersonneInd(0)});
    }
  }

  repondreOui(creneau: ICreneau, index: number): void{
    this.donnesService.addReponse({creneau: creneau, reponse: true, personne: this.donnesService.getPersonneInd(0)});
    this.creneauxEvent[index].nbRepPositive++;
    if(this.creneauPref != undefined){
      if(this.donnesService.getCreneauInd(creneau.id).nbRepPositive > this.creneauPref.nbRepPositive){
        this.creneauPref = this.donnesService.getCreneauInd(creneau.id);
      }
    }
  }

  repondreNon(creneau: ICreneau): void{
    this.donnesService.addReponse({creneau: creneau, reponse: false, personne: this.donnesService.getPersonneInd(0)});
  }

  cloturer(creneau: ICreneau): void{
    this.donnesService.clotureEvent(creneau);
  }
}
