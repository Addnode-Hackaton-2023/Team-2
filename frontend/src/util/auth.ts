import { loadModules } from 'esri-loader';

const clientId = 'yz7QjY5Gr8K7SlwS';
const redirect = 'http://localhost:3000/login/oauth';

export const temporaryToken =
  '0zgWp24i1U_k6o8-X3q2cuZDS3hH6u4dDRb_Tr28hUAbI4bc7jSMmuEhrkCFeRAV4rsPSSpT0AZZpUrBs_yDAGiZw3TCF7BSdZy7nH-A3YmUbupoLAXCQhSXF63VVnABDjIFFk2SO2Q2yExtmGZipWWtRATvsih4YgxkWmfZDGt5Lud24ZkxLA8XaNjm1hAinMuDoEVLHwPEz2nU2ZMyQsXn0XE8GMv9D23jISMBMz4';
export const oauthHref = `https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=token&expiration=20160&redirect_uri=${redirect}`;

export async function getToken() {
  const modules = [
    'esri/identity/OAuthInfo',
    'esri/identity/IdentityManager',
    'esri/portal/Portal',
  ];
  const [OAuthInfo, IdentityManager, Portal] = await loadModules(modules);

  const info = new OAuthInfo({
    appId: 'yz7QjY5Gr8K7SlwS',
    flowType: 'auto',
    popup: true,
  });

  IdentityManager.registerOAuthInfos([info]);
  console.log(IdentityManager.checkSignInStatus());
}
