import React from "react";
import { IDimension } from "../../types";
import { ICell, IGridCell } from "../../types/GridInterfaces";
import { IAppContextActions } from "./reducer";

export type IGrid = IGridCell[][];

export interface IAppContext {
   rows: IGrid;
   gridDimensions: IDimension;
   currentCellOver: ICell | null;
   source: IGridCell;
   destination: IGridCell;
   pathFound: boolean;
   shortestPath: Array<number>;
   visitedOnShortestPath: Set<number>;
   visited: Set<number>;
   BFSQueue: Array<number>;
   algoRunning: boolean;
}

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<
   React.Dispatch<IAppContextActions>
>(null as unknown as React.Dispatch<IAppContextActions>);
