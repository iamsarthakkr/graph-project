import { IAction, IDimension } from "../../types";
import { ICell } from "../../types/GridInterfaces";
import { runBFS } from "../Algorithms";
import {
   addToShortestPath,
   getShortestPath,
   initAlgo,
   updateCellOver,
   updateGridDimension,
   updateSource,
} from "./AppActions";
import { IAppContext } from "./AppContext";

// action types
export const UPDATE_GRID_DIMENSION = "app/update_grid_dimension";
export const INIT_ALGO = "app/init_algo";
export const GET_SHORTEST_PATH = "app/get_shortest_path";
export const ADD_TO_SHORTEST_PATH = "app/add_to_shortest_path";
export const UPDATE_CELL_OVER = "app/update_cell_over";
export const UPDATE_SOURCE = "app/update_source";
export const RUN_BFS = "app/run_bfs";

export type UpdateGridDimension = IAction<
   typeof UPDATE_GRID_DIMENSION,
   { newDimensions: IDimension }
>;
export type InitAlgo = IAction<typeof INIT_ALGO>;
export type GetShortestPath = IAction<typeof GET_SHORTEST_PATH>;
export type AddToShortestPath = IAction<typeof ADD_TO_SHORTEST_PATH>;
export type UpdateCellOver = IAction<typeof UPDATE_CELL_OVER, { point: ICell }>;
export type UpdateSource = IAction<typeof UPDATE_SOURCE>;

export type RunBFS = IAction<typeof RUN_BFS>;

export type IAppContextActions =
   | UpdateGridDimension
   | InitAlgo
   | UpdateCellOver
   | UpdateSource
   | GetShortestPath
   | AddToShortestPath
   | RunBFS;

export const reducer: React.Reducer<IAppContext, IAppContextActions> = (
   state,
   action
) => {
   switch (action.type) {
      case UPDATE_GRID_DIMENSION:
         return updateGridDimension(state, action);
      case INIT_ALGO:
         return initAlgo(state, action);
      case UPDATE_CELL_OVER:
         return updateCellOver(state, action);
      case UPDATE_SOURCE:
         return updateSource(state, action);
      case GET_SHORTEST_PATH:
         return getShortestPath(state, action);
      case ADD_TO_SHORTEST_PATH:
         return addToShortestPath(state, action);
      case RUN_BFS:
         return runBFS(state, action);
      default:
         return state;
   }
};
