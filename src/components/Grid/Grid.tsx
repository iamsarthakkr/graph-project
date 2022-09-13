import React from "react";
import { get2DArray } from "../../utils";
import { Container, GridCell, GridRow } from "./GridComponents";
import { IGridProps } from "../../types";

export const Grid = (props: IGridProps) => {
   const { width, height, rows, columns } = props;
   console.log({ props });

   const rowWidth = columns * width;

   const gridRows = get2DArray(rows, columns).map((_row, i) => {
      const row = _row.map((_col, j) => (
         <GridCell id={`Cell ${i} ${j}`} width={width} height={height} />
      ));
      console.log(row);

      return (
         <GridRow
            id={`Row ${i}`}
            columns={columns}
            height={height}
            width={rowWidth}
         >
            {row}
         </GridRow>
      );
   });
   console.log(gridRows);

   return <Container>{gridRows}</Container>;
};
