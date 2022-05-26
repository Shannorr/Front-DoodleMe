import { Component, OnInit } from '@angular/core';
import {IFavoris} from "../../shared/favoris";
import {ActivatedRoute} from "@angular/router";
import {PartageData} from "../../shared/bdService";
import {bdDataService} from "../../services/bd.service";
import {bdResponseEvent} from "../../shared/bd";
import {IEvenement} from "../../shared/evenement";
import {IPersonne} from "../../shared/personne";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-favoris-event-user',
  templateUrl: './favoris-event-user.component.html',
  styleUrls: ['./favoris-event-user.component.css']
})
export class FavorisEventUserComponent implements OnInit {
  pageTitle: string = "Mes événements favoris";
  user!: IPersonne;
  mesFavoris: IEvenement[] = [];

  constructor(private route: ActivatedRoute,
              private donnesService: PartageData,
              private dataBD: bdDataService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idU'));
    this.dataBD.recupererFavorisUser(id).subscribe((data: bdResponseEvent) => {
      this.mesFavoris = data.data
      console.log("j'ai des données" +  this.mesFavoris)
    });
    console.log( "j'ai plus de données" + this.mesFavoris);
    this.user = this.tokenStorageService.getUser();
  }

}
