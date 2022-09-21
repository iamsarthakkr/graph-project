import React from "react";
import {
   IAlgorithmConfig,
   ICell,
   ICellChangeEvent,
   IDimension,
   IGrid,
   IGridCell,
   IVisitingOrder,
} from "../types";
import { IAppContextActions } from "./reducer";

export interface IAppContext {
   rows: IGrid;
   gridDimensions: IDimension;
   currentCellOver: ICell | null;
   cellChangeEvent: ICellChangeEvent;
   source: IGridCell;
   destination: IGridCell;

   algorithmConfig: IAlgorithmConfig;

   visualizeStepDuration: number;

   visualizingAlgo: boolean;
   visualizingShortestPath: boolean;

   visitingOrder: IVisitingOrder;
   visited: Set<number>;

   visitedOnShortestPath: Set<number>;
   shortestPath: Array<number>;
}

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<
   React.Dispatch<IAppContextActions>
>(null as unknown as React.Dispatch<IAppContextActions>);
