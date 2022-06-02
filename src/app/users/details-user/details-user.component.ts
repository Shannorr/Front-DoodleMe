import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IPersonne} from "../../shared/personne";
import {IEvenement} from "../../shared/evenement";
import {IReponse} from "../../shared/reponse";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {bdResponseEvent, bdResponseReponse} from "../../shared/bd";
import {bdDataService} from "../../services/bd.service";

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  pageTitle: string = "Profil de l'utilisateur";
  personne!: IPersonne;
  eventCree: IEvenement[] = [];
  eventParticipe: IReponse[] = [];

  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService, private dataBD: bdDataService) { }

  //récuperation de l'user connecté, des événements qu'il a créé et des événements auxquels il a répondu
  ngOnInit(): void {
    this.personne = this.tokenStorageService.getUser();

    this.dataBD.recupererEventCreer(this.personne.iduser).subscribe((data: bdResponseEvent) => {
      this.eventCree = data.data
    });

    this.dataBD.recupererEventRepondu(this.personne.iduser).subscribe((data: bdResponseReponse) => {
      this.eventParticipe = data.data
    });
  }

  addFavoris(event: IEvenement){
    this.dataBD.ajouterFavoris(this.personne.iduser, event.id);
  }
}
