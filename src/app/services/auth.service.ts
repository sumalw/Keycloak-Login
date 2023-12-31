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
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (
        this.oauthService.hasValidIdToken() &&
        this.oauthService.hasValidAccessToken()
      ) {
        this.setAuthenticatedData();
      }
    });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.user.next(null!);
    // this.router.navigate(['/welcome']);
    localStorage.removeItem('userData');
    this.oauthService.logOut();
  }

  setAuthenticatedData() {
    if (
      this.oauthService.hasValidIdToken() &&
      this.oauthService.hasValidAccessToken()
    ) {
      const userClaims: any = this.oauthService.getIdentityClaims();

      const user = new User(
        userClaims.email,
        userClaims.family_name,
        userClaims.given_name,
        userClaims.name,
        this.oauthService.getAccessToken(),
        this.oauthService.getIdToken(),
        this.oauthService.getAccessTokenExpiration()
      );

      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  getAccessTokenExpiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  getLoggedInUsername() {
    const userClaims: any = this.oauthService.getIdentityClaims();
    if (userClaims) {
      return userClaims.name ? userClaims.name : '';
    }
  }

  getClaimInfo() {
    return this.oauthService.getIdentityClaims();
  }
}
