// import { Action } from "redux";
import { ActionType } from "../action-types";
import {CellType} from '../cell';
export type directon='up'|'down'

export interface MoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: directon

    }

}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string;

}

export interface InsertCellBeforeAction {
    type: ActionType.INSERT_CELL_BEFORE;
    payload: {
        id: string;
        type: CellType;
    }

}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    }

}



export type Action =
    | MoveCellAction
    | DeleteCellAction
    | InsertCellBeforeAction
    | UpdateCellAction;


