import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from '../api.service';
import { AppState } from '../app.state';
import * as HistoryActions from '../history.actions'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLoading: boolean = false;
  start: number = 0;
  searchType: string = 'search';
  end: number = 15;
  dataArray = [];
  imageArray = [];
  scholarTemplate;
  loadedFromStore: boolean = false
  query: string;
  constructor(private api: ApiService, activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.queryParamMap.subscribe(queryParams => {
      this.query = queryParams['params']['q'];
      this.searchType = queryParams['params']['t'];
      this.api.getStoreRef().select('history').subscribe(state => {
        const storedData = state.find(element => (element.queryParams.q === this.query && element.queryParams.t === this.searchType))
        if (storedData && storedData['result']) {
          this.assignResults(storedData['result']);
          this.loadedFromStore = true;
        }
        else this.loadedFromStore = false;
      })
    })
  }

  ngOnInit() {
    this.fetchResults(this.query);
  }

  fetchResults(query, searchType?: string) {
    let results;
    if (searchType)
      this.searchType = searchType;
    else searchType = this.searchType;
    searchType = searchType || 'news';
    query = query || 'india';
    this.router.navigate(['/search'], { queryParams: { q: query, t: searchType } });
    this.api.getStoreRef().dispatch(new HistoryActions.AddHistory({ queryParams: { q: query, t: searchType }, timeStamp: String(new Date()) }));
    if (!this.loadedFromStore) {
      this.isLoading = true;
      this.api.fetchResults(query, searchType).subscribe(result => {
        results = { data: result, q: query, t: searchType };
        this.assignResults(result);
      }, error => { }, () => {
        this.isLoading = false;
        this.api.getStoreRef().dispatch(new HistoryActions.EditHistory(results))
      });
    }
    this.loadedFromStore = false;

  }

  assignResults(result) {
    this.dataArray = [];
    this.imageArray = [];
    this.scholarTemplate = undefined;
    switch (this.searchType) {
      case 'news': {
        this.dataArray = result['entries'] || [];
        break;
      }
      case 'images': {
        this.imageArray = result['image_results'] || [];
        break;
      }
      case 'search': {
        this.dataArray = result['results'] || [];
        break;
      }
      case 'crawl': {
        this.dataArray = result['results'] || [];
        break;
      }
      case 'scholar': {
        this.scholarTemplate = result['html'] || undefined;
      }
    }
  }
}
