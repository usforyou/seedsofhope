import { AuthServiceConfig, FacebookLoginProvider, 
  GoogleLoginProvider, LinkedinLoginProvider
   } from "angular-6-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("")
    },
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("")
    },
    {
      id: LinkedinLoginProvider.PROVIDER_ID,
      provider: new LinkedinLoginProvider("")
    }
  ]);
  return config;
}
export function getAppID(provider){
  switch(provider){
    case 'gmail': return "";
    case 'facebook': return "";
    case 'linkedIn': return "";
  }
}