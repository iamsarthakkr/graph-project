import { HEIGHT, WIDTH } from "../../constants";
import { IAction, IDimension } from "../../types";
import { getEmptyGrid } from "../../utils";
import { IAppContext } from "./AppContext";

// action types
export const UPDATE_GRID_DIMENSION = "app/update_grid_dimension";

export type UpdateGridDimension = IAction<
   typeof UPDATE_GRID_DIMENSION,
   { newDimensions: IDimension }
>;

// actions
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
      console.log({ rows, columns });

      const grid = getEmptyGrid(rows, columns);

      // update source and destination
      const newSource = state.source;
      newSource.row = Math.min(newSource.row, rows - 1);
      newSource.column = Math.min(newSource.column, columns - 1);

      const newDestination = state.source;
      newDestination.row = Math.min(newDestination.row, rows - 1);
      newDestination.column = Math.min(newDestination.column, columns - 1);

      return {
         ...state,
         gridDimensions,
         grid,
         source: newSource,
         destination: newDestination,
      };
   }
   return state;
};

export type IAppContextActions = UpdateGridDimension;

export const reducer: React.Reducer<IAppContext, IAppContextActions> = (
   state,
   action
) => {
   switch (action.type) {
      case UPDATE_GRID_DIMENSION:
         return updateGridDimension(state, action);
      default:
         return state;
   }
};
