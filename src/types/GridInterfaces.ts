export interface ICellProps {
   width: number;
   height: number;
}

export interface IGridRowProps extends ICellProps {
   columns: number;
}

export interface IGridProps extends IGridRowProps {
   rows: number;
}
