import { DefaultAuth0Profile } from "./auth0"

export default class Profile {
  public uuid: string = ""

  public isSubscribed: boolean = false

  public dateExpires: number = 0

  public oauthProfile: DefaultAuth0Profile = new DefaultAuth0Profile()
}
