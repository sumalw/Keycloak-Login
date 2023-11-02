import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  get expiration() {
    const milliseconds = this.authService.getAccessTokenExpiration();
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    return minutes;
  }

  get token() {
    return this.authService.getAccessToken();
  }

  get userName() {
    return this.authService.getLoggedInUsername();
  }
}
