import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'medical-provider-app';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.handleRedirectCallback().subscribe({
      next: (result) => {
        // Handle the result if needed
        console.log('Auth callback result:', result);
      },
      error: (err) => {
        // Handle errors if needed
        console.error('Auth callback error:', err);
      }
    });
  }
}
