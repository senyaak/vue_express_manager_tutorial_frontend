export class Client {
  public _id?: string;
  public name: String;
  public email: String;
  public phone: String;

  constructor()
  constructor(
    name: String,
    email: String,
    phone: String,
  )
  constructor(
    name?: String,
    email?: String,
    phone?: String,
  ){
    if(name && email && phone) {
      this.name = name;
      this.email = email;
      this.phone = phone;
    } else {
      this.name = '';
      this.email = '';
      this.phone = '';
    }
  }
}
