import { HistoryModel } from './history.model';
import * as HistoryActions from './history.actions'

export function reducer(state: HistoryModel[] = [] , action: HistoryActions.Actions) {
    console.log(state)
    switch(action.type) {
        case HistoryActions.ADD_HISTORY:
            return [...state, action.payload];
        case HistoryActions.REMOVE_HISTORY:
            const index = action.payload;
            return [...state.slice(0, index), ...state.slice(index + 1)];
        default:
            return state;
    }
}