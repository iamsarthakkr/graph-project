export interface IPoint {
   x: number;
   y: number;
}

export interface IDimension {
   width: number;
   height: number;
}

export interface IGridRowProps extends IDimension {
   width: number;
   height: number;
}

export interface ICell {
   row: number;
   column: number;
}

export type IGridCellType =
   | "EMPTY"
   | "SOURCE"
   | "DESTINATION"
   | "WALL"
   | "WEIGHTED";

export interface IGridCell extends ICell {
   distanceFromSource: number;
   prevCell: IGridCell | null;
   cellType: IGridCellType;
}
