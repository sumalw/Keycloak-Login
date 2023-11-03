export class User {
  constructor(
    public email: string,
    public family_name: string,
    public given_name: string,
    public name: string,
    public access_token: string,
    public id_token: string,
    public expires_at: number
  ) {}
}
