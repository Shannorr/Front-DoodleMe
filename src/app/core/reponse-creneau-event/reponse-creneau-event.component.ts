import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PartageData} from "../../shared/bdService";
import {bdDataService} from "../../services/bd.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {IEvenement} from "../../shared/evenement";
import {ICreneau} from "../../shared/creneau";
import {bdResponseCreneau, bdResponseEvent, bdResponsePersonne} from "../../shared/bd";
import {IPersonne} from "../../shared/personne";
import {IReponseUser} from "../../shared/userReponse";

@Component({
  selector: 'app-reponse-creneau-event',
  templateUrl: './reponse-creneau-event.component.html',
  styleUrls: ['./reponse-creneau-event.component.css']
})
export class ReponseCreneauEventComponent implements OnInit {
  pageTitle: string = "Détail des réponses du créneau";
  event!: IEvenement;
  creneau!: ICreneau;
  userReponse: IReponseUser[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataBD: bdDataService) { }

  ngOnInit(): void {
    const idE = Number(this.route.snapshot.paramMap.get('idE'));
    const idC = Number(this.route.snapshot.paramMap.get('idC'));
    if(idE >= 0) {
      this.dataBD.recupererEventById(idE).subscribe((data: bdResponseEvent) => {
        this.event = data.data[0];
      });
    }
    if(idC >= 0){
      this.dataBD.recupCreneauById(idC).subscribe((data: bdResponseCreneau) => {
        this.creneau = data.data[0];
      });
      this.dataBD.recupererUserRepondantCreneau(idC).subscribe((data: bdResponsePersonne) => {
        this.userReponse = data.data;
        console.log(this.userReponse, data);
        console.log(data.data);
      });
    }
  }

  onBack(): void{
    this.router.navigate(['/evenements/' + this.event.id]);
  }

}
