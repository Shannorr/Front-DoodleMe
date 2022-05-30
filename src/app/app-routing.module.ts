import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PresentationComponent} from "./presentation/presentation.component";
import {LoginComponent} from "./users/login/login.component";
import {AccueilComponent} from "./core/accueil/accueil.component";
import {CreerEventComponent} from "./core/creer-event/creer-event.component";
import {DetailsEventComponent} from "./core/details-event/details-event.component";
import {DetailsUserComponent} from "./users/details-user/details-user.component";
import {FavorisEventUserComponent} from "./users/favoris-event-user/favoris-event-user.component";
import {ReponseCreneauEventComponent} from "./core/reponse-creneau-event/reponse-creneau-event.component";

const routes: Routes = [
  {path: 'connexion', component: LoginComponent},
  {path: 'presentation', component: PresentationComponent},
  {path: 'evenements', component: AccueilComponent},
  {path: 'users', component: DetailsUserComponent},
  {path: 'users/:idU', component: DetailsUserComponent},
  {path: 'users/:idU/favoris', component: FavorisEventUserComponent},
  {path: 'evenements/creation', component: CreerEventComponent},
  {path: 'evenements/:idE', component: DetailsEventComponent},
  {path: 'evenements/:idE/creneaux/:idC', component: ReponseCreneauEventComponent},
  {path: '', redirectTo: "connexion", pathMatch: "full" },
  {path: "**", redirectTo: "connexion", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
