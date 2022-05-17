import { Component, OnInit } from '@angular/core';
import {IFavoris} from "../../shared/favoris";
import {ActivatedRoute} from "@angular/router";
import {PartageData} from "../../shared/bdService";

@Component({
  selector: 'app-favoris-event-user',
  templateUrl: './favoris-event-user.component.html',
  styleUrls: ['./favoris-event-user.component.css']
})
export class FavorisEventUserComponent implements OnInit {
  pageTitle: string = "Mes événements favoris";
  mesFavoris: IFavoris[] = [];

  constructor(private route: ActivatedRoute,
              private donnesService: PartageData) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('idU'));
    var i = 0;
    while(i < this.donnesService.getTailleFavoris()){
      if(this.donnesService.getFavorisInd(i).personne.id == id){
        this.mesFavoris.push(this.donnesService.getFavorisInd(i));
      }
      i++;
    }
  }

}
