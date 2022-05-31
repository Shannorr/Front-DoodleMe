import {Component, OnDestroy, OnInit} from '@angular/core';
import {IEvenement} from "../../shared/evenement";
import {PartageData} from "../../shared/bdService";
import {ICreneau} from "../../shared/creneau";
import {bdDataService} from "../../services/bd.service";
import {TokenStorageService} from "../../services/token-storage.service";
import { bdResponseEvent } from 'src/app/shared/bd';
import {IPersonne} from "../../shared/personne";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  pageTitle: string = "Les événements en cours";
  errorMessage: string = "";
  filteredEvents: IEvenement[] = [];
  evenements: IEvenement[] = [];
  private _listFilter: string = "";
  user!: IPersonne;

  constructor(private donnesService: PartageData, private dataBD: bdDataService, private tokenStorageService: TokenStorageService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  ngOnInit(): void {
    this.dataBD.recupererEvent().subscribe((data: bdResponseEvent) => {
      this.evenements = data.data
      this.filteredEvents = this.evenements;
      // console.log("j'ai des données" +  this.evenements)
    });
    // console.log( "j'ai plus de données" + this.evenements);
    this.user = this.tokenStorageService.getUser();
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter:", value);
    this.filteredEvents = this.performFilter(value);
  }

  performFilter(filterBy: string): IEvenement[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.evenements.filter((event: IEvenement) =>
      event.nom.toLocaleLowerCase().includes(filterBy));
  }

  addFavoris(event: IEvenement){
    this.dataBD.ajouterFavoris(this.user.iduser, event.id);
  }
}
