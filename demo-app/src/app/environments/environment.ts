export const environment = {
    production: false,
    auth: {
      clientID: 'YOUR_CLIENT_ID',
      domain: 'YOUR_AUTH0_DOMAIN', // e.g., you.auth0.com
      redirect: 'http://localhost:4200/callback',
      scope: 'openid profile email',
      logoutURL: 'http://localhost:4200'
    },
    helloApi: {
        url: 'YOUR_API_URL'
    }
  };
  