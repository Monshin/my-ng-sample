import { environment as base } from './environment.base';

const domain = '192.168.2.203';
const port = 4200;

export const environment = {
  ...base,
  production: false,
  env: 'prod-online',

  apiUrl: 'https://api.example.com',
  shareDomain: `${domain}:${port}`,
  shareUrl: `http://${domain}:${port}`,

  domainUrl: [domain, 'localhost'],
};
