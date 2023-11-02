import { Injectable } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../config/auth.config';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);

  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (
        this.oauthService.hasValidIdToken() &&
        this.oauthService.hasValidAccessToken()
      ) {
        this.isAuthenticated();
      }
    });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.user.next(null!);
    this.router.navigate(['/welcome']);
    localStorage.removeItem('userData');
    this.oauthService.logOut();
  }

  isAuthenticated(): boolean {
    if (
      this.oauthService.hasValidIdToken() &&
      this.oauthService.hasValidAccessToken()
    ) {
      const userClaims: any = this.oauthService.getIdentityClaims();

      const user = new User(
        userClaims.email,
        userClaims.family_name,
        userClaims.given_name,
        userClaims.name
      );

      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }

    return (
      this.oauthService.hasValidIdToken() &&
      this.oauthService.hasValidAccessToken()
    );
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  getAccessTokenExpiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  getLoggedInUsername() {
    const userClaims: any = this.oauthService.getIdentityClaims();
    return userClaims.name ? userClaims.name : '';
  }

  getClaimInfo() {
    return this.oauthService.getIdentityClaims();
  }
}
