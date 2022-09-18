import styled from "styled-components";
import { convertToPixels, getBackgroundColor } from "../../utils";
import { IDimension } from "../../types";
import { IGridCellType } from "../../types/GridInterfaces";

export const Container = styled.div`
   flex: 1;

   display: grid;
   justify-content: center;
   align-content: center;
   & > div:last-child {
      border-bottom: 1px solid #1972d1;
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
   border-right: 1px solid #1972d1;

   display: flex;
`;

export const Cell = styled.div.attrs((props: ICellProps) => props)`
   width: ${(props) => convertToPixels(props.width)};
   height: ${(props) => convertToPixels(props.height)};
   background-color: ${(props) =>
      props.cellOnPath
         ? "#53ea38"
         : props.visited
         ? "#00a9f7"
         : getBackgroundColor(props.cellType)};
   border-top: 1px solid #1972d1;
   border-left: 1px solid #1972d1;

   display: grid;
   justify-content: center;
   align-content: center;
`;
