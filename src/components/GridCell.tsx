import React from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { HEIGHT, WIDTH } from "../constants";
import { UPDATE_CELL_OVER } from "../context/appActions";
import { useAppContext } from "../context/useAppContext";
import { useAppContextActions } from "../context/useAppContextActions";
import { IGridCell } from "../types";
import { hash } from "../utils";
import { Cell } from "./GridComponents";

export const GridCell = (props: IGridCell) => {
   const { visited, visitedOnShortestPath } = useAppContext();
   const dispatch = useAppContextActions();

   const handleMouseOver = () => {
      dispatch({ type: UPDATE_CELL_OVER, payload: { point: props } });
   };

   const handleMouseDown = () => {
      console.log("mouse-down", { props });
   };

   const handleMouseUp = () => {
      console.log("mouse-up", { props });
   };

   let Icon = null;
   switch (props.cellType) {
      case "SOURCE":
         Icon = <GiSevenPointedStar />;
         break;
      case "DESTINATION":
         Icon = <IoMdFlag />;
         break;
      default:
         break;
   }

   const isVisited = visited.has(hash(props));
   const cellOnPath = visitedOnShortestPath.has(hash(props));

   return (
      <Cell
         onMouseOver={handleMouseOver}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         width={WIDTH}
         height={HEIGHT}
         visited={isVisited}
         cellOnPath={cellOnPath}
         cellType={props.cellType}
      >
         {Icon}
      </Cell>
   );
};
