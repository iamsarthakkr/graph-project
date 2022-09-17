import React from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { HEIGHT, WIDTH } from "../../constants";
import { IGridCell } from "../../types";
import { equals } from "../../utils";
import { useAppContext } from "../App/useAppContext";
import { Cell } from "./GridComponents";

export const GridCell = (props: IGridCell) => {
   const { source, destination } = useAppContext();

   const Icon = equals(source, props) ? (
      <GiSevenPointedStar />
   ) : equals(destination, props) ? (
      <IoMdFlag />
   ) : null;

   return (
      <Cell width={WIDTH} height={HEIGHT}>
         {Icon}
      </Cell>
   );
};
