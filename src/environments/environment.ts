export const environment = {
    production: false,
    apiUrl: 'http://prestadores.recetalia.com:8080/api',
    otherConfig: 'someOtherValue',
    auth0: {
        domain: 'dev-w3y7ykm3xm4ahdoa.us.auth0.com',
        clientId: 'gnTtV5PRZZRU8RQ4QL8e6RRZUGR1KKQ9',
        authorizationParams: {
          redirect_uri: 'http://localhost:4200/prescriptions',
        },
        errorPath: '/callback',
      }
    
};