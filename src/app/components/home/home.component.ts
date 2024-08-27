import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public authService: AuthService) {
    console.log("que onda wey 22");

  }

  logout(){
    this.authService.logout();
    console.log("que onda wey!!");
  }

}
