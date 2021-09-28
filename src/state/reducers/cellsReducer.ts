import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell'

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
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
            return state;
        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter((id)=>id!==action.payload)
            return state;
        case ActionType.MOVE_CELL:
            const {direction} = action.payload;
            const index =state.order.findIndex((id)=>id===action.payload.id)
            const targeIndex = direction==='up'?index-1 :index+1
            if(targeIndex<0||targeIndex>state.order.length-1){
                return state;
            }

            state.order[index] = state.order[targeIndex]
            state.order[targeIndex] = action.payload.id;
            return state;
        case ActionType.INSERT_CELL_BEFORE:
            const cell: Cell={
                content:'',
                type:action.payload.type,
                id:randomId()

            }
            state.data[cell.id] = cell;
            const currentIndex = state.order.findIndex( id => id === action.payload.id);
            if(currentIndex<0){
                state.order.push(cell.id)
            }else{
                state.order.splice(currentIndex,0,cell.id)
            }
            return state;
        default:
            return state;
    }
});

const randomId = ()=>{
    return Math.random().toString(36).substr(2,5);
}
export default reducer;