import React from "react";
import { IDimension, IGrid } from "../../types";
import { IGridCell } from "../../types/GridInterfaces";
import { IAppContextActions } from "./reducer";

export interface IAppContext {
   grid: IGrid;
   gridDimensions: IDimension;
   source: IGridCell;
   destination: IGridCell;
}

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<
   React.Dispatch<IAppContextActions>
>(null as unknown as React.Dispatch<IAppContextActions>);
