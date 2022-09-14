import React from "react";
import { get2DArray } from "../../utils";
import { Container, GridCell, GridRow } from "./GridComponents";
import { IGridProps } from "../../types";

export const Grid = React.forwardRef<HTMLDivElement, IGridProps>(
   (props, ref) => {
      const { width, height, rows, columns } = props;
      console.log({ props });

      const gridRows = get2DArray(rows, columns).map((_row, i) => {
         const row = _row.map((_col, j) => (
            <GridCell key={`Cell ${i} ${j}`} width={width} height={height} />
         ));

         return (
            <GridRow
               key={`Row ${i}`}
               columns={columns}
               height={height}
               width={columns * width}
            >
               {row}
            </GridRow>
         );
      });

      return <Container ref={ref}>{gridRows}</Container>;
   }
);
