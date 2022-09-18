import React from "react";
import { GiSevenPointedStar } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { HEIGHT, WIDTH } from "../../constants";
import { IGridCell } from "../../types";
import { hash } from "../../utils";
import { UPDATE_CELL_OVER } from "../App/reducer";
import { useAppContext } from "../App/useAppContext";
import { useAppContextActions } from "../App/useAppContextActions";
import { Cell } from "./GridComponents";

export const GridCell = (props: IGridCell) => {
   const { visited, visitedOnShortestPath } = useAppContext();
   const dispatch = useAppContextActions();

   const handleMouseOver = () => {
      dispatch({ type: UPDATE_CELL_OVER, payload: { point: props } });
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
