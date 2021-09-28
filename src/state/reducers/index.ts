import { type } from 'os';
import {combineReducers} from 'redux';
import CellReducer from './cellsReducer';

const reducers = combineReducers({
    cells:CellReducer
});
export default reducers;
export type RootState = ReturnType<typeof reducers>;
