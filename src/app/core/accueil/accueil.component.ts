import {Component, OnDestroy, OnInit} from '@angular/core';
import {IEvenement} from "../../shared/evenement";
import {PartageData} from "../../shared/bdService";
import {ICreneau} from "../../shared/creneau";
import {bdDataService} from "../../services/bd.service";
import {TokenStorageService} from "../../services/token-storage.service";
import { bdResponseEvent } from 'src/app/shared/bd';

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
  testEvent: IEvenement[] = [];

  constructor(private donnesService: PartageData, private dataBD: bdDataService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  ngOnInit(): void {
    this.dataBD.recupererEvent().subscribe((data: bdResponseEvent) => {
      this.testEvent = data.data
      console.log("j'ai des données" +  this.testEvent)
    });


    console.log( "j'ai plus de données" + this.testEvent);
    
    this.getEvents();
    this.donnesService.addPersonne({id: this.donnesService.getTaillePersonne(), lastname: "Jacob", firstname: "Nicolas", username: "nicojp"})
  }

  getEvents(): void {
    this.evenements = this.donnesService.getEvents();
    this.filteredEvents = this.evenements;
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
    this.donnesService.addFavoris({event: event, personne: this.donnesService.getPersonneInd(0)});
  }
}
