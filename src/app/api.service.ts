import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = environment.baseURL;
  headers = new HttpHeaders({ "x-rapidapi-key": "14141881c1msh4a1722d5980edfap11b56cjsn75a2314eec49", "x-rapidapi-host": "google-search3.p.rapidapi.com" });
  constructor(private httpClient: HttpClient) { }

  queryConverter(query) {
    return query.split(' ').join('+');
  }

  fetchResults(query, type) {
    return this.httpClient.get(this.baseURL + `${type}/q='${this.queryConverter(query)}'`, { headers: this.headers });
  }
}
