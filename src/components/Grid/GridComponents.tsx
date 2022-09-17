import styled from "styled-components";
import { convertToPixels } from "../../utils";
import { IDimension } from "../../types";

export const Container = styled.div`
   flex: 1;

   display: grid;
   justify-content: center;
   align-content: center;
   & > div:last-child {
      border-bottom: 1px solid #1972d1;
   }
`;

export const GridRow = styled.div.attrs((props: IDimension) => props)`
   width: ${(props) => convertToPixels(props.width)};
   height: ${(props) => convertToPixels(props.height)};
   border-right: 1px solid #1972d1;

   display: flex;
`;

export const Cell = styled.div.attrs((props: IDimension) => props)`
   width: ${(props) => convertToPixels(props.width)};
   height: ${(props) => convertToPixels(props.height)};
   border-top: 1px solid #1972d1;
   border-left: 1px solid #1972d1;

   display: grid;
   justify-content: center;
   align-content: center;
`;
