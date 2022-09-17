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
export interface IGridCell extends ICell {
   distanceFromSource: number;
   prevCell: IGridCell | null;
}
