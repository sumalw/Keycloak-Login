import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/mvipSSO',
  redirectUri: 'http://localhost:4200/dashboard',
  clientId: 'sso-auth',
  scope: 'openid profile email offline_access',
  responseType: 'code',
};
