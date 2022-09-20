import React from "react";
import { VISUALIZE_SHORTEST_PATH_STEP } from "../context/appActions";
import { useAppContext } from "../context/useAppContext";
import { useAppContextActions } from "../context/useAppContextActions";

export const ShortestPathVisualizer = () => {
   const { visualizingShortestPath } = useAppContext();
   const dispatch = useAppContextActions();

   React.useEffect(() => {
      console.log({ visualizingShortestPath });
      if (!visualizingShortestPath) return;

      const timer = setInterval(() => {
         dispatch({ type: VISUALIZE_SHORTEST_PATH_STEP });
      }, 10);
      return () => {
         console.log("clearing up........");
         clearInterval(timer);
      };
   }, [dispatch, visualizingShortestPath]);

   return null;
};
