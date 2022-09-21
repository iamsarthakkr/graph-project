import { IAppContext } from "./context";
import { IGridCell } from "./types";

export const HEIGHT = 30;
export const WIDTH = 30;
export const INFINITY = 1000000000;

export const dr = [1, -1, 0, 0],
   dc = [0, 0, 1, -1];

export const EMPTY_GRID_CELL: IGridCell = {
   row: 0,
   column: 0,
   distanceFromSource: INFINITY,
   prevCell: null,
   cellType: "EMPTY",
};

export const EMPTY_SOURCE_GRID_CELL: IGridCell = {
   ...EMPTY_GRID_CELL,
   distanceFromSource: 0,
   cellType: "SOURCE",
};

export const EMPTY_DESTINATION_GRID_CELL: IGridCell = {
   ...EMPTY_GRID_CELL,
   cellType: "DESTINATION",
};

export const EMPTY_GRID_CONTEXT: IAppContext = {
   rows: [[]],
   gridDimensions: {
      width: 0,
      height: 0,
   },
   currentCellOver: null,
   cellChangeEvent: "NONE",
   source: EMPTY_SOURCE_GRID_CELL,
   destination: EMPTY_DESTINATION_GRID_CELL,
   shortestPath: [],
   visitedOnShortestPath: new Set<number>(),
   visited: new Set<number>(),
   visualizingAlgo: false,
   visualizingShortestPath: false,
   algorithmConfig: {
      order: [],
      shortestPath: null,
   },
   visitingOrder: [],
};
