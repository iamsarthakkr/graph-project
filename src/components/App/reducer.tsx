import { HEIGHT, WIDTH } from "../../constants";
import { IAction, IDimension, IGridCell } from "../../types";
import { getEmptyGrid, hash } from "../../utils";
import { runBFS } from "../Algorithms";
import { IAppContext } from "./AppContext";

// action types
export const UPDATE_GRID_DIMENSION = "app/update_grid_dimension";
export const INIT_ALGO = "app/init_algo";
export const RUN_BFS = "app/run_bfs";

export type UpdateGridDimension = IAction<
   typeof UPDATE_GRID_DIMENSION,
   { newDimensions: IDimension }
>;
export type InitAlgo = IAction<typeof INIT_ALGO>;
export type RunBFS = IAction<typeof RUN_BFS>;

// actions

const initAlgo = (state: IAppContext, action: InitAlgo) => {
   const { source } = state;
   const visited = new Set<number>();
   visited.add(hash({ row: source.row, column: source.column }));
   const BFSQueue = [hash({ ...source })];
   return { ...state, algoRunning: true, visited, BFSQueue };
};

const updateGridDimension = (
   state: IAppContext,
   action: UpdateGridDimension
) => {
   if (action.payload) {
      const { width, height } = action.payload?.newDimensions;

      // TODO: Update the grid object also to an empty grid with source and destination also set
      const gridDimensions: IDimension = { width, height };

      // get a new grid
      const rows = Math.floor(gridDimensions.height / HEIGHT) - 1,
         columns = Math.floor(gridDimensions.width / WIDTH) - 1;

      const gridRows = getEmptyGrid(rows, columns);

      // update source and destination
      const source = { row: Math.floor(rows / 2) - 1, column: 2 };
      const dest = { row: Math.floor(rows / 2) - 1, column: columns - 3 };
      const newSource: IGridCell = gridRows[source.row][source.column];
      const newDestination: IGridCell = gridRows[dest.row][dest.column];

      gridRows[newSource.row][newSource.column].distanceFromSource = 0;

      return {
         ...state,
         rows: gridRows,
         gridDimensions,
         source: newSource,
         destination: newDestination,
      };
   }
   return state;
};

export type IAppContextActions = UpdateGridDimension | InitAlgo | RunBFS;

export const reducer: React.Reducer<IAppContext, IAppContextActions> = (
   state,
   action
) => {
   switch (action.type) {
      case UPDATE_GRID_DIMENSION:
         return updateGridDimension(state, action);
      case INIT_ALGO:
         return initAlgo(state, action);
      case RUN_BFS:
         return runBFS(state, action);
      default:
         return state;
   }
};
