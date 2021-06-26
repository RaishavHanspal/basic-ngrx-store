import { Action } from '@ngrx/store';
import { HistoryModel, SearchData } from './history.model';
export const ADD_HISTORY = 'Add';
export const REMOVE_HISTORY = 'Remove';
export const EDIT_HISTORY = 'Edit';

export class AddHistory implements Action {
    readonly type = ADD_HISTORY
    constructor(public payload: HistoryModel) { }
}

export class RemoveHistory implements Action {
    readonly type = REMOVE_HISTORY
    constructor(public payload: number) { }
}

export class EditHistory implements Action {
    readonly type = EDIT_HISTORY
    constructor(public payload: SearchData) { }
}

export type Actions = AddHistory | RemoveHistory | EditHistory;