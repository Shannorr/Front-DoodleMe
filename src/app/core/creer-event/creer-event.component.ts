import { Component, OnInit } from '@angular/core';
import {PartageData} from "../../shared/bdService";
import {Time} from "@angular/common";
import {bdDataService} from "../../services/bd.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {IPersonne} from "../../shared/personne";
import {bdResponseCreneau, bdResponseEvent} from "../../shared/bd";
import {IEvenement} from "../../shared/evenement";
import {ICreneau} from "../../shared/creneau";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private donnesService: PartageData, private dataBD: bdDataService,
              private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
  }

  async creation(): Promise<void> {
    if (this.nom === "") {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: "Remplissez le champ nom !",
        width: 300,
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      const tabCreneau : any[] = [];

      if (this.creneau1 != "") {
        var date1 = this.creneau1.split("T")[0];
        var heure1 = this.creneau1.split("T")[1];
        tabCreneau.push({
          date: date1 ,
          heureDebut: heure1
        })
      }

      if (this.creneau2 != "") {
        var date2 = this.creneau2.split("T")[0];
        var heure2 = this.creneau2.split("T")[1];
        tabCreneau.push({
          date: date2 ,
          heureDebut: heure2
        })
      }

      const res = await this.dataBD.creerEvent(this.nom, this.description, this.user.iduser, tabCreneau);

    }
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }

}
