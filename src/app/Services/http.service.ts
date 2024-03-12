import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  public get<T>(url: string, params?: {[param: string]: any}): Observable<T> {
    const headers = new HttpHeaders();

    return this.http.get<T>(url, {headers, params});
  }

  public post<T>(url: string, body: any, params: {[params: string]: any}): Observable<T> {
    const headers = new HttpHeaders();
    
    return this.http.post<T>(url, body, {headers, params});
  }
}
