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
export interface IGridCell {
   row: number;
   column: number;
   distanceFromSource: number;
   prevCell: IGridCell | null;
}

export interface IGrid {
   rows: IGridCell[][];
}
