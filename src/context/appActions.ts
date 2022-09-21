import { HEIGHT, WIDTH } from "../constants";
import {
   IAction,
   IAlgorithm,
   ICell,
   ICellChangeEvent,
   IDimension,
   IGridCell,
} from "../types";
import { getEmptyGrid, hash } from "../utils";
import { runBFS } from "./algoActions";
import { IAppContext } from ".";

export const UPDATE_GRID_DIMENSION = "app/update_grid_dimension";
export type UpdateGridDimension = IAction<
   typeof UPDATE_GRID_DIMENSION,
   { newDimensions: IDimension }
>;
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

      newSource.cellType = "SOURCE";
      newDestination.cellType = "DESTINATION";

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

export const START_CELL_CHANGE_EVENT = "app/start_cell_change_event";
export type StartCellChangeEvent = IAction<
   typeof START_CELL_CHANGE_EVENT,
   { cellChangeEvent: ICellChangeEvent }
>;
export const startCellChangeEvent = (
   state: IAppContext,
   action: StartCellChangeEvent
): IAppContext => {
   if (action.payload) {
      return {
         ...state,
         cellChangeEvent: action.payload.cellChangeEvent,
      };
   }
   return state;
};

export const END_CELL_CHANGE_EVENT = "app/end_cell_change";
export type EndCellChangeEvent = IAction<typeof END_CELL_CHANGE_EVENT>;
export const endCellChangeEvent = (
   start: IAppContext,
   action: EndCellChangeEvent
): IAppContext => {
   return { ...start, cellChangeEvent: "NONE" };
};

export const UPDATE_CELL_OVER = "app/update_cell_over";
export type UpdateCellOver = IAction<typeof UPDATE_CELL_OVER, { point: ICell }>;
export const updateCellOver = (state: IAppContext, action: UpdateCellOver) => {
   if (action.payload) {
      const { cellChangeEvent, rows, source, destination } = state;
      const { point } = action.payload;
      const { row: newRow, column: newColumn } = point;

      switch (cellChangeEvent) {
         case "NONE":
            return { ...state, currentCellOver: point };
         case "SOURCE":
            return { ...state, currentCellOver: point };
         case "DESTINATION":
            return { ...state, currentCellOver: point };
         case "NORMAL":
      }
   }
   return state;
};

export const UPDATE_SOURCE = "app/update_source";
export type UpdateSource = IAction<typeof UPDATE_SOURCE>;
export const updateSource = (state: IAppContext, action: UpdateSource) => {
   const newSource = state.currentCellOver;
   if (newSource) {
      const { row, column } = newSource;
      return { ...state, source: state.rows[row][column] };
   }
   return state;
};

export const RUN_ALGO = "app/run_algo";
export type RunAlgo = IAction<typeof RUN_ALGO, { algorithm: IAlgorithm }>;
export const runAlgo = (state: IAppContext, action: RunAlgo): IAppContext => {
   if (action.payload) {
      switch (action.payload.algorithm) {
         case "NONE":
            return state;
         case "BFS":
            return runBFS(state);
      }
   }
   return state;
};

export const SET_VISUALIZING_ALGO = "app/set_visualize_algo";
export type SetVisualizeAlgo = IAction<
   typeof SET_VISUALIZING_ALGO,
   { visualizingAlgo: boolean; visualizeStepDuration: number }
>;
export const setVisualizeAlgo = (
   state: IAppContext,
   action: SetVisualizeAlgo
): IAppContext => {
   if (action.payload) {
      return {
         ...state,
         visualizingAlgo: action.payload.visualizingAlgo,
         visualizeStepDuration: action.payload.visualizeStepDuration,
      };
   }
   return state;
};

export const VISUALIZE_ALGO_STEP = "app/visualize_algo_step";
export type VisualizeAlgoStep = IAction<
   typeof VISUALIZE_ALGO_STEP,
   { animate: boolean }
>;
export const visualizeAlgoStep = (
   state: IAppContext,
   action: VisualizeAlgoStep
): IAppContext => {
   if (action.payload && state.visualizingAlgo) {
      const { visitingOrder, visited } = state;
      if (visitingOrder.length === 0) {
         // visualize
         return {
            ...state,
            visualizingAlgo: false,
            visualizingShortestPath: true,
         };
      }
      const newVisitingOrder = visitingOrder.map((order) => {
         return {
            visitingTime: order.visitingTime,
            visitedNodes: [...order.visitedNodes],
         };
      });
      const newVisited = new Set<number>([...visited]);

      const toVisit = action.payload.animate ? 1 : newVisitingOrder.length;
      let reachedDestination = false;
      for (let t = 0; t < toVisit; t++) {
         if (reachedDestination) break;
         const currOrder = newVisitingOrder[0];
         newVisitingOrder.shift();
         for (const hashVal of currOrder.visitedNodes) {
            newVisited.add(hashVal);
            if (hash(state.destination) === hashVal) {
               reachedDestination = true;
               break;
            }
         }
      }

      let newState: IAppContext = {
         ...state,
         visited: newVisited,
         visitingOrder: newVisitingOrder,
      };
      if (reachedDestination)
         newState = {
            ...newState,
            visualizingAlgo: false,
            visualizingShortestPath: true,
         };
      return newState;
   }
   return state;
};

export const SET_VISUALIZING_SHORTEST_PATH =
   "app/set_visualizing_shortest_path";
export type SetVisualizingShortestPath = IAction<
   typeof SET_VISUALIZING_SHORTEST_PATH,
   { visualizingShortestPath: boolean }
>;
export const setVisualizingShortestPath = (
   state: IAppContext,
   action: SetVisualizingShortestPath
): IAppContext => {
   if (action.payload) {
      return {
         ...state,
         visualizingShortestPath: action.payload.visualizingShortestPath,
      };
   }
   return state;
};

export const VISUALIZE_SHORTEST_PATH_STEP = "app/visualize_shortest_path_step";
export type VisualizeShortestPathStep = IAction<
   typeof VISUALIZE_SHORTEST_PATH_STEP,
   { animate: boolean }
>;
export const visualizeShortestPathStep = (
   state: IAppContext,
   action: VisualizeShortestPathStep
): IAppContext => {
   console.log("visualizing shortest path", { state });

   if (action.payload && state.visualizingShortestPath) {
      const { shortestPath, visitedOnShortestPath } = state;
      if (shortestPath.length === 0) {
         // done
         return {
            ...state,
            visualizingShortestPath: false,
            visualizeStepDuration: 0,
         };
      }

      const newShortestPath = [...shortestPath];
      const newVisitedOnShortestPath = new Set<number>([
         ...visitedOnShortestPath,
      ]);

      const toVisit = action.payload.animate ? 1 : newShortestPath.length;
      for (let i = 0; i < toVisit; i++) {
         newVisitedOnShortestPath.add(newShortestPath[0]);
         newShortestPath.shift();
      }

      let newState: IAppContext = {
         ...state,
         visitedOnShortestPath: newVisitedOnShortestPath,
         shortestPath: newShortestPath,
      };
      if (newShortestPath.length === 0)
         newState = { ...newState, visualizingShortestPath: false };

      return newState;
   }
   return state;
};
