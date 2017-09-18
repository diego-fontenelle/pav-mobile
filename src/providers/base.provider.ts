import { Observable } from 'rxjs/Observable';
import { Injectable, Optional, Inject  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BaseProvider {

  private _headers: Headers;
  
    constructor(protected _http: Http) { 
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
    }

    setHeaders() {
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      // let user:any = this._authService.getUser();
      // //this.headers.append('Authorization', user.token);
      // this.headers.append('Authorization', JSON.parse(user).token);
      let user: any = JSON.parse(sessionStorage.getItem("/user"));;
      this.headers.append('Authorization', user.token);
  }

  public get headers(): any {
      return this._headers;
  }

  public set headers(value: any) {
      this._headers = value;
  }

  private configureHeaders(path: string): Headers {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token = sessionStorage.getItem("/access");
    if (token != null || path.localeCompare("login") == 0) {
      headers.append("Authorization", token);
    }
    return headers;
  }

  handleData(response: Response) {
      return response.text() == "" ? response.text() : response.json();
  }

  private onError(error: any) {
    return Observable.throw(error.json !== 'undefined' ? error.json() : 'Ocorreu um erro ao acessar o servidor');
  }

  protected get(url): Observable<Response> {

    let headers = this.configureHeaders(url);

    return this._http.get(url, { headers: headers })
      .map((res: Response) => res.json())
      .catch(this.onError);

  }

  protected post(url: string, body: any): Observable<Response> {

    let headers = this.configureHeaders(url);
    
    return this._http.post(url, body, { headers: headers })
      .map((res: Response) => res.json())
      .catch(this.onError);

  }

  protected put(url: string, body: any): Observable<Response> {
    
        let headers = this.configureHeaders(url);
        
        return this._http.put(url, body, { headers: headers })
          .map((res: Response) => res.json())
          .catch(this.onError);
    
      }


}