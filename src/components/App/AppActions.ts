import { HEIGHT, WIDTH } from "../../constants";
import { IDimension, IGridCell } from "../../types";
import { getEmptyGrid, hash } from "../../utils";
import { IAppContext } from "./AppContext";
import {
   AddToShortestPath,
   GetShortestPath,
   InitAlgo,
   UpdateCellOver,
   UpdateGridDimension,
   UpdateSource,
} from "./reducer";

export const initAlgo = (state: IAppContext, action: InitAlgo) => {
   const { source } = state;
   const visited = new Set<number>();
   visited.add(hash({ row: source.row, column: source.column }));
   const BFSQueue = [hash({ ...source })];
   const visitedOnShortestPath = new Set<number>();
   return {
      ...state,
      algoRunning: true,
      visited,
      BFSQueue,
      pathFound: false,
      visitedOnShortestPath,
   };
};

export const updateGridDimension = (
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

export const updateCellOver = (state: IAppContext, action: UpdateCellOver) => {
   if (action.payload) {
      return { ...state, currentCellOver: action.payload.point };
   }
   return state;
};

export const updateSource = (state: IAppContext, action: UpdateSource) => {
   const newSource = state.currentCellOver;
   if (newSource) {
      const { row, column } = newSource;
      return { ...state, source: state.rows[row][column] };
   }
   return state;
};

export const getShortestPath = (
   state: IAppContext,
   action: GetShortestPath
) => {
   console.log("updating shortest path......");

   const shortestPath: Array<number> = [];

   let node: IGridCell | null = state.destination;
   while (node !== null) {
      shortestPath.push(hash(node));
      node = node.prevCell;
   }
   shortestPath.reverse();
   const newState: IAppContext = {
      ...state,
      shortestPath,
      algoRunning: false,
   };
   return newState;
};

export const addToShortestPath = (
   state: IAppContext,
   action: AddToShortestPath
) => {
   const { shortestPath, visitedOnShortestPath, pathFound } = state;

   const newVisitedOnShortestPath = new Set([...visitedOnShortestPath]);
   const newShortestPath = [...shortestPath];

   if (newShortestPath.length === 0) return state;
   const top = newShortestPath[0];
   newShortestPath.shift();

   newVisitedOnShortestPath.add(top);

   return {
      ...state,
      shortestPath: newShortestPath,
      visitedOnShortestPath: newVisitedOnShortestPath,
      pathFound: pathFound && newShortestPath.length > 0,
   };
};
