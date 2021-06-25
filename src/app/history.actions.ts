import { Action } from '@ngrx/store';
import { HistoryModel } from './history.model';
export const ADD_HISTORY = 'Add'
export const REMOVE_HISTORY = 'Remove'

export class AddHistory implements Action {
    readonly type = ADD_HISTORY
    constructor(public payload: HistoryModel) {}
}

export class RemoveHistory implements Action {
    readonly type = REMOVE_HISTORY
    constructor(public payload: number) {}
}

export type Actions = AddHistory | RemoveHistory