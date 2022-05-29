import { Component, OnInit } from '@angular/core';
import {PartageData} from "../../shared/bdService";
import {Time} from "@angular/common";
import {bdDataService} from "../../services/bd.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {IPersonne} from "../../shared/personne";
import {bdResponseCreneau, bdResponseEvent} from "../../shared/bd";
import {IEvenement} from "../../shared/evenement";
import {ICreneau} from "../../shared/creneau";

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

  async creation(): Promise<void> {
    await this.dataBD.creerEvent(this.nom, this.description, this.user.iduser);
    var eventCree: IEvenement;
    this.dataBD.recupererLastEventCreerByUser(this.user.iduser).subscribe(async (data: bdResponseEvent) => {
      eventCree = data.data[0];
      if (this.creneau1 != "") {
        var date1 = this.creneau1.split("T")[0];
        var heure1 = this.creneau1.split("T")[1];
        await this.dataBD.creerCreneau(date1, heure1, eventCree.id);

        var creneauUn: ICreneau;
        this.dataBD.recupererCreneauByEventId(eventCree.id).subscribe((data: bdResponseCreneau) => {
          creneauUn = data.data[0];
          this.dataBD.ajouterReponse(creneauUn.id, this.user.iduser, true);
        });
      }

      if (this.creneau2 != "") {
        var date2 = this.creneau2.split("T")[0];
        var heure2 = this.creneau2.split("T")[1];
        await this.dataBD.creerCreneau(date2, heure2, eventCree.id);

        var creneauDeux: ICreneau;
        this.dataBD.recupererCreneauByEventId(eventCree.id).subscribe((data: bdResponseCreneau) => {
          creneauDeux = data.data[1];
          this.dataBD.ajouterReponse(creneauDeux.id, this.user.iduser, true);
        });
      }
    });
  }
}
