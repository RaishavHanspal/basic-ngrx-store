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

  isLoading: boolean = true;
  start: number = 0;
  searchType: string = 'search';
  end: number = 15;
  dataArray = [];
  imageArray = [];
  scholarTemplate;
  query: string;
  constructor(private api: ApiService, activatedRoute: ActivatedRoute, private router: Router, private store : Store<AppState>) {
    activatedRoute.queryParamMap.subscribe(queryParams => {
      this.query = queryParams['params']['q'];
      this.searchType = queryParams['params']['t'];
    })
  }

  ngOnInit() {
    this.fetchResults();
  }

  fetchResults(searchType?: string) {
    if (searchType) { this.searchType = searchType; }
    this.searchType = this.searchType || 'news';
    this.query = this.query || 'india';
    this.router.navigate(['/search'], { queryParams: { q: this.query, t: this.searchType } });
    this.isLoading = true;
    this.store.dispatch(new HistoryActions.AddHistory({queryParams: { q: this.query, t: this.searchType } , timeStamp: String(new Date())}) );      
    this.api.fetchResults(this.query, this.searchType).subscribe(result => {
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
    }, error => { }, () => { this.isLoading = false });
  }

}
