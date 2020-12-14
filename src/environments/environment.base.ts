const domain = 'localhost';
const port = 4200;

export const environment = {
  production: false,
  env: 'default',
  verison: '0.0.0.0',
  siteName: '我的網站',

  apiUrl: 'http://localhost:8080',
  shareDomain: `${domain}:${port}`,
  shareUrl: `http://${domain}:${port}`,

  domainUrl: [domain],
};
