import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BaseProvider } from './base.provider';

@Injectable()
export class EventoProvider extends BaseProvider{

  private url = 'http://localhost:3000/evento/';//'https://api-pav.herokuapp.com/evento/';

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

  getByUsuario(id) {
    return this.get("http://localhost:3000/evento/usuario/" + id);
  }

  toggleLike(body) {
    return this.put(this.url + "like", body);
  }

}