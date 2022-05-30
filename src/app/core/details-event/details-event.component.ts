import { Component, OnInit } from '@angular/core';
import {PartageData} from "../../shared/bdService";
import {ActivatedRoute, Router} from "@angular/router";
import {IEvenement} from "../../shared/evenement";
import {ICreneau} from "../../shared/creneau";
import {bdResponseCreneau, bdResponseEvent} from "../../shared/bd";
import {bdDataService} from "../../services/bd.service";
import {IPersonne} from "../../shared/personne";
import {TokenStorageService} from "../../services/token-storage.service";


@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
  pageTitle: string = "Détail de l'événement";
  event!: IEvenement;
  creneauxEvent: ICreneau[] = [];
  idEvent!: number;
  creneauPref!: ICreneau[];
  nbRepMax!: number;
  creneauNew: string = "";
  user!: IPersonne;

  constructor(private route: ActivatedRoute,
              private donnesService: PartageData,
              private router: Router,
              private dataBD: bdDataService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.idEvent = Number(this.route.snapshot.paramMap.get('idE'));
    if(this.idEvent >= 0) {
      this.dataBD.recupererEventById(this.idEvent).subscribe((data: bdResponseEvent) => {
        this.event = data.data[0];
      });
      this.dataBD.recupererCreneauByEventId(this.idEvent).subscribe((data: bdResponseCreneau) => {
        this.creneauxEvent = data.data;
      });
      this.dataBD.recupererCreneauPrefByEventId(this.idEvent).subscribe((data: bdResponseCreneau) => {
        this.creneauPref = data.data;
        this.nbRepMax = this.creneauPref[0].nbRepPositive;
      });
    }
    this.user = this.tokenStorageService.getUser();
  }

  async creerNewCreneau(): Promise<void>{
    if(this.creneauNew != ""){
      var date = this.creneauNew.split("T")[0];
      var heure = this.creneauNew.split("T")[1];
      await this.dataBD.creerCreneau(date, heure, this.event.id);

      var creneau: ICreneau;
      await this.dataBD.recupererCreneauByEventId(this.event.id).subscribe(async (data: bdResponseCreneau) => {
        this.creneauxEvent = data.data;
      });
    }
    this.router.navigate(['/evenements']);
  }

  async repondreOui(creneau: ICreneau): Promise<void> {
    await this.dataBD.ajouterReponse(creneau.id, this.user.iduser, true);
    this.dataBD.recupererCreneauPrefByEventId(this.idEvent).subscribe((data: bdResponseCreneau) => {
      this.creneauPref = data.data;
      this.nbRepMax = this.creneauPref[0].nbRepPositive;
    });
    this.router.navigate(['/evenements']);
  }

  async repondreNon(creneau: ICreneau): Promise<void> {
    await this.dataBD.ajouterReponse(creneau.id, this.user.iduser, false);
    this.dataBD.recupererCreneauPrefByEventId(this.idEvent).subscribe((data: bdResponseCreneau) => {
      this.creneauPref = data.data;
      this.nbRepMax = this.creneauPref[0].nbRepPositive;
    });
    this.router.navigate(['/evenements']);
  }

  async cloturer(creneau: ICreneau): Promise<void> {
    await this.dataBD.clotureEvent(creneau.evenement.id);
    //passer creneau a true;
    this.router.navigate(['/evenements']);
  }

  reponseCreneau(c: ICreneau): void{
    this.router.navigate(['/evenements/' + c.evenement.id + '/creneaux/' + c.id])
  }
}
