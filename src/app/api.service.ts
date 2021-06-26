import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = environment.baseURL;
  credentailsA = {"x-rapidapi-key": "0ad122a2cemsh192ef677f054b7bp11111ejsn857a08b9979a", "x-rapidapi-host": "google-search3.p.rapidapi.com"};
  credentailsB = { "x-rapidapi-key": "14141881c1msh4a1722d5980edfap11b56cjsn75a2314eec49", "x-rapidapi-host": "google-search3.p.rapidapi.com" }
  headers = new HttpHeaders(this.credentailsA);
  constructor(private httpClient: HttpClient, private store : Store<AppState>) { }

  queryConverter(query) {
    return query.split(' ').join('+');
  }

  fetchResults(query, type) {
    return this.httpClient.get(this.baseURL + `${type}/q='${this.queryConverter(query)}'`, { headers: this.headers });
  }

  getStoreRef(){
    return this.store;
  }
}
