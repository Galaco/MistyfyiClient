
interface Auth0Profile {
    email: string;
    email_verified: boolean;
    iss: string;
    sub: string;
    aud: string;
    iat: number;
    exp: number;
    at_hash: string;
    nonce: string;
}

class DefaultAuth0Profile implements Auth0Profile {
    public email: string = '';
    // tslint:disable-next-line
    public email_verified: boolean = false;
    public iss: string = '';
    public sub: string = '';
    public aud: string = '';
    public iat: number = 0;
    public exp: number = 0;
    // tslint:disable-next-line
    public at_hash: string = '';
    public nonce: string = '';
}

export {
    Auth0Profile,
    DefaultAuth0Profile,
};
