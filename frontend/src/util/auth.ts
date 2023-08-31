import { loadModules } from 'esri-loader';

const clientId = 'yz7QjY5Gr8K7SlwS';
const redirect = 'http://localhost:3000/login/oauth';

export const temporaryToken =
  'OxArzIqi2xIWwd0v-fsKVVwO4b2C2nKhznsxapj4-K89CAjUPe1uJCJfKI8Ym3YC-G6vGfASlXkAu2CUyA7M4-WcSpYvqb6Isu2RpUB9ZU05a48xJNamUUeCzL-wyegr93G-kbECytjjn77_IU5ai89c3KLpzzMPlmDlg2DZwLWx5e-xLKrQx6IgDx1Ss80AIOKdy8BDwF81lwJxIhKECDLEAhjrC6rXaTsd5sFXQ7A';
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
