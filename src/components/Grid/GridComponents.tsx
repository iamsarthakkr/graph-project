import styled from "styled-components";
import { convertToPixels } from "../../utils";
import { ICellProps, IGridRowProps } from "../../types";

export const Container = styled.div`
   flex: 1;
   border: 1px solid red;

   display: grid;
   justify-content: center;
   align-content: center;
`;

export const GridRow = styled.div.attrs((props: IGridRowProps) => props)`
   width: ${(props) => convertToPixels(props.width)};
   height: ${(props) => convertToPixels(props.height)};
   display: flex;
`;

export const GridCell = styled.div.attrs((props: ICellProps) => props)`
   width: ${(props) => convertToPixels(props.width)};
   height: ${(props) => convertToPixels(props.height)};
   border: 1px solid green;
`;
