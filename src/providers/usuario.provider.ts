import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BaseProvider } from './base.provider';

@Injectable()
export class UsuarioProvider extends BaseProvider{

  private url = 'http://localhost:3000/usuario/'//'https://api-pav.herokuapp.com/usuario/';
  public session: any;

  constructor(public http: Http) {
    super(http);
  }

  create(body) {
    return this.post(this.url, body);
  }

  read(id?) {
    return this.get(this.url + (id ? id : ''));
  }

  update(body) {
    return this.put(this.url, body);
  }

  login(body) {
    return this.post(this.url + 'login/', body); 
  }

  avaliar(body) {
    return this.put(this.url + 'avaliar', body);
  }
}