import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import {IPersonne} from "./shared/personne";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle: string = 'DodleMe';
  user!: IPersonne;
  isLoggedIn = false;
  showUserBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.showUserBoard = true;
    }
    this.user = this.tokenStorageService.getUser();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
