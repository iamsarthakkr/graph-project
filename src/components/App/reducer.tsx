import { HEIGHT, WIDTH } from "../../constants";
import { IAction, IDimension, IGridCell } from "../../types";
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
      const newSource: IGridCell = { row: Math.floor(rows / 2) - 1, column: 2 };
      const newDestination: IGridCell = {
         row: Math.floor(rows / 2) - 1,
         column: columns - 3,
      };

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
