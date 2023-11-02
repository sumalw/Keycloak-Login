import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name: string = '';
  isAuthenticated: boolean = false;
  private userSub: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.name = user.name;
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  get token() {
    return '';
  }
}
