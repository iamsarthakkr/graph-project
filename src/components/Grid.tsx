import React from "react";
import { GridCell } from "./GridCell";
import { Container, GridRow } from "./GridComponents";
import { IGridCell } from "../types";
import { useAppContext } from "../context/useAppContext";
import { HEIGHT, WIDTH } from "../constants";

export const Grid = React.forwardRef<HTMLDivElement>((props, ref) => {
   const { rows } = useAppContext();

   const nRows = rows.length,
      nCols = nRows ? rows[0].length : 0;

   const grid = rows.map((row, i) => (
      <GridRow key={`Row: ${i}`} width={nCols * WIDTH} height={HEIGHT}>
         {row.map((cell: IGridCell) => (
            <GridCell key={`Cell: ${cell.row} ${cell.column}`} {...cell} />
         ))}
      </GridRow>
   ));

   return <Container ref={ref}>{grid}</Container>;
});
