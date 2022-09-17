import React from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { HEIGHT, WIDTH } from "../../constants";
import { IGridCell } from "../../types";
import { equals, hash } from "../../utils";
import { useAppContext } from "../App/useAppContext";
import { Cell } from "./GridComponents";

export const GridCell = (props: IGridCell) => {
   const { source, destination, visited, visitedOnShortestPath } =
      useAppContext();

   const Icon = equals(source, props) ? (
      <GiSevenPointedStar />
   ) : equals(destination, props) ? (
      <IoMdFlag />
   ) : null;

   const isVisited = visited.has(hash(props));
   const onPath = visitedOnShortestPath.has(hash(props));

   return (
      <Cell width={WIDTH} height={HEIGHT} visited={isVisited} onPath={onPath}>
         {Icon}
      </Cell>
   );
};
