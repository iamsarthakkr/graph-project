import { IAppContext } from "./components/App/AppContext";
import { IGridCell } from "./types";
import { ICell } from "./types/GridInterfaces";

export const HEIGHT = 25;
export const WIDTH = 25;
export const INFINITY = 1000000000;

export const EMPTY_GRID_CELL: IGridCell = {
   row: 0,
   column: 0,
   distanceFromSource: INFINITY,
   prevCell: null,
};

export const EMPTY_SOURCE_GRID_CELL: IGridCell = {
   ...EMPTY_GRID_CELL,
   distanceFromSource: 0,
};

export const EMPTY_GRID_CONTEXT: IAppContext = {
   rows: [[]],
   gridDimensions: {
      width: 0,
      height: 0,
   },
   source: EMPTY_SOURCE_GRID_CELL,
   destination: EMPTY_GRID_CELL,
   visited: new Set<ICell>(),
};
