import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell'

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}
const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {}
};
const reducer = produce((
    state: CellState = initialState,
    action: Action) => {
    //  return state;
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload
            state.data[id].content = content; //this is simplified by produced from immer
            // return;
            return;
            // the return below is replace with immer right at the line above
            // return {
            //     ...state,
            //     data: {
            //         ...state.data, 
            //         [id]: {
            //             ...state.data[id], 
            //             content
            //         }
            //     }
            // };
            // return;
        case ActionType.DELETE_CELL:
            delete state.data[action.payload]
            state.order = state.order.filter((id)=>id!==action.payload)
            return;
        case ActionType.MOVE_CELL:
            const {direction} = action.payload;
            const index =state.order.findIndex((id)=>id===action.payload.id)
            const targeIndex = direction==='up'?index-1 :index+1
            if(targeIndex<0||targeIndex>state.order.length-1){
                return;
            }

            state.order[index] = state.order[targeIndex]
            state.order[targeIndex] = action.payload.id;
            return ;
        case ActionType.INSERT_CELL_BEFORE:
            return state;
        default:
            return state;
    }
});
export default reducer;