import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PartageData} from "../../shared/bdService";
import {IPersonne} from "../../shared/personne";
import {IEvenement} from "../../shared/evenement";
import {IReponse} from "../../shared/reponse";
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  constructor(private route: ActivatedRoute, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.personne = this.tokenStorageService.getUser();

  }
}
