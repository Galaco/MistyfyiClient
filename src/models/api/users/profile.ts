import { Auth0Profile, DefaultAuth0Profile } from './auth0';

export default class Profile {
    public uuid: string = '';

    public isSubscribed: boolean = false;

    public dateExpires: number = 0;

    public oauthProfile: Auth0Profile = new DefaultAuth0Profile();
}
