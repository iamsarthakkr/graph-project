import styled from "styled-components";
import { IDimension, IGridCellType } from "../types";
import { convertToPixels, getBackgroundColor } from "../utils";

export const Container = styled.div`
   flex: 1;

   display: grid;
   justify-content: center;
   align-content: center;
   & > div:last-child {
      border-bottom: 1px solid var(--border-color);
   }
`;

export interface ICellProps extends IDimension {
   visited: boolean;
   cellOnPath: boolean;
   cellType: IGridCellType;
}

export const GridRow = styled.div.attrs((props: IDimension) => props)`
   width: ${(props) => convertToPixels(props.width)};
   height: ${(props) => convertToPixels(props.height)};
   border-right: 1px solid var(--border-color);

   display: flex;
`;

export const Cell = styled.div.attrs((props: ICellProps) => props)`
   width: ${(props) => convertToPixels(props.width)};
   height: ${(props) => convertToPixels(props.height)};
   background-color: ${(props) =>
      props.cellOnPath
         ? `var(--path-cell-color)`
         : props.visited
         ? `var(--visited-cell-color)`
         : getBackgroundColor(props.cellType)};
   border-top: 1px solid var(--border-color);
   border-left: 1px solid var(--border-color);

   display: grid;
   justify-content: center;
   align-content: center;
`;
