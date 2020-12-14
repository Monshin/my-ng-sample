import { environment as base } from './environment.base';

const doamin = 'www.exaple.com';
const mainDomain = 'exaple.com';

export const environment = {
  ...base,
  production: true,
  env: 'production',

  apiUrl: 'https://api.example.com',
  shareDomain: doamin,
  shareUrl: `https://${doamin}`,

  domainUrl: [mainDomain],
};
