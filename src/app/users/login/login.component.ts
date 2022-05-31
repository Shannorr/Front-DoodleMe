import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  formRegister: any = {
    username: "",
    lastname: "",
    firstname: "",
    password: ""
  };

  formLogin: any = {
    username: "",
    password: ""
  };

  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmitLogin(): void {
    const { username, password } = this.formLogin;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
        this.router.navigate(["/evenements"]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }
  reloadPageM() {
    setTimeout(()=>{
      window.location.reload();
    }, 1000);
  }


  goNext(): void {
    if (this.isLoggedIn) {
      console.log("sad")
      this.router.navigate(['/evenements']);
    }
  }

  onSubmitRegister(): void {
    console.log(this.formRegister)
    const { username, lastname, firstname, password } = this.formRegister;
    this.authService.register(username, lastname, firstname, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.reloadPageM();
        this.router.navigate(["/connexion"]);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: "Utilisateur créer avec success",
          width: 300,
          showConfirmButton: false,
          timer: 1500
        })
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
