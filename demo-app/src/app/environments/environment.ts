export const environment = {
    production: false,
    auth: {
      clientID: 'I7i7pj9a7FngtBCp3CdIHiz8mgvt1Aq1',
      domain: 'my-demo-auth.au.auth0.com', // e.g., you.auth0.com
      redirect: 'http://localhost:4200/callback',
      scope: 'openid profile email',
      logoutURL: 'http://localhost:4200'
    },
    helloApi: {
        url: 'https://azure-web-demo.azurewebsites.net/api/Hello'
    }
  };
  