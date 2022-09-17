import React from "react";
import styled from "styled-components";
import { GridCell } from "./GridCell";
import { Container, GridRow } from "./GridComponents";
import { IGridCell } from "../../types";
import { useAppContext } from "../App/useAppContext";
import { HEIGHT, WIDTH } from "../../constants";

export const Grid = React.forwardRef<HTMLDivElement>((props, ref) => {
   const { grid: gridState, gridDimensions } = useAppContext();

   const nRows = gridState.rows.length,
      nCols = nRows ? gridState.rows[0].length : 0;

   const grid = gridState.rows.map((row, i) => (
      <GridRow key={`Row: ${i}`} width={nCols * WIDTH} height={HEIGHT}>
         {row.map((cell: IGridCell) => (
            <GridCell key={`Cell: ${cell.row} ${cell.column}`} {...cell} />
         ))}
      </GridRow>
   ));

   console.log({ grid });

   return <Container ref={ref}>{grid}</Container>;
});
