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
        case HistoryActions.EDIT_HISTORY:
            return state.map(element => {
                if(element.queryParams.q === action.payload.q && element.queryParams.t === action.payload.t)
                {
                    return {...element, 'result' : action.payload.data}
                }
                else return element;
            });
        default:
            return state;
    }
}