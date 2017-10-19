import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { BaseProvider } from './base.provider';

@Injectable()
export class DoacaoProvider extends BaseProvider {

  private url = 'http://localhost:3000/doacao/';

  constructor(private http: Http) {
    super(http);
  }

  create(body) {
    return this.post(this.url, body);
  }

  read(id?) {
    return this.get(this.url + (id ? id : ''));
  }

  getByUserId(id) {
    return this.get(this.url + 'usuario/' + id);
  }

  getByStatus(status) {
    return this.get(this.url + 'status/' + status);
  }

  update(body) {
    return this.put(this.url, body);
  }


}