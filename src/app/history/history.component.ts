import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { HistoryModel } from '../history.model';
import * as HistoryActions from '../history.actions'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.historyArray = store.select('history');
   }
   query:string;
  historyArray : Observable<HistoryModel[]>;
  ngOnInit(): void {
  }

  deleteFromStore(index){
    this.store.dispatch(new HistoryActions.RemoveHistory(index));   
  }
}
