interface Auth0Profile {
  email: string
  // eslint-disable-next-line
  email_verified: boolean
  iss: string
  sub: string
  aud: string
  iat: number
  exp: number
  // eslint-disable-next-line
  at_hash: string
  nonce: string
}

class DefaultAuth0Profile implements Auth0Profile {
  public email: string = ""
  // eslint-disable-next-line
  public email_verified: boolean = false
  public iss: string = ""
  public sub: string = ""
  public aud: string = ""
  public iat: number = 0
  public exp: number = 0
  // eslint-disable-next-line
  public at_hash: string = ""
  public nonce: string = ""
}

export { DefaultAuth0Profile }
