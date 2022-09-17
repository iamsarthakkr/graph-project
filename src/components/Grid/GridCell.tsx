import React from "react";
import { HEIGHT, WIDTH } from "../../constants";
import { IGridCell } from "../../types";
import { Cell } from "./GridComponents";

export const GridCell = (props: IGridCell) => {
   return <Cell width={WIDTH} height={HEIGHT} />;
};
