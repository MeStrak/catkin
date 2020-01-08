import auth0 from 'auth0-js';
// import authConfig from '../auth_config.json';
import eventBus from './event-bus';
import { apolloClient } from '@/main';

const webAuth = new auth0.WebAuth({
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  redirectUri: `${window.location.origin}/callback`,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  clientID: process.env.VUE_APP_AUTH0_CLIENT_ID,
  responseType: 'token id_token',
  scope: 'openid profile email',
});

class AuthService {
  accessToken = null;
  idToken = null;
  profile = null;
  tokenExpiry = null;
  // Starts the user login flow
  //   login(customState) {
  //     webAuth.authorize({
  //       appState: customState,
  //     });
  //   }
  login() {
    webAuth.authorize({
      //   appState: customState,
    });
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('gqlbear', '');
    apolloClient.clearStore();
    eventBus.$emit('logout');
  }

  // Handles the callback request from Auth0
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err);
        } else {
          this.localLogin(authResult);
          resolve(authResult.idToken);
        }
      });
    });
  }
  localLogin(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.accessToken = authResult.accessToken;

    // Convert the JWT expiry time from seconds to milliseconds
    this.tokenExpiry = new Date(this.profile.exp * 1000);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('gqlbear', this.accessToken);
    eventBus.$emit('login');
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  }
}

export default new AuthService();
