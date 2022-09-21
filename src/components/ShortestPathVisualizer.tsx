import React from "react";
import { visualizeStepDurations } from "../constants";
import { VISUALIZE_SHORTEST_PATH_STEP } from "../context/appActions";
import { useAppContext } from "../context/useAppContext";
import { useAppContextActions } from "../context/useAppContextActions";

export const ShortestPathVisualizer = () => {
   const { visualizingShortestPath, visualizeStepDuration } = useAppContext();
   const dispatch = useAppContextActions();

   React.useEffect(() => {
      console.log({ visualizingShortestPath });
      if (!visualizingShortestPath) return;

      if (visualizeStepDuration === visualizeStepDurations.INSTANT) {
         dispatch({
            type: VISUALIZE_SHORTEST_PATH_STEP,
            payload: { animate: false },
         });
      }

      const timer = setInterval(() => {
         dispatch({
            type: VISUALIZE_SHORTEST_PATH_STEP,
            payload: { animate: true },
         });
      }, visualizeStepDuration);
      return () => {
         console.log("clearing up........");
         clearInterval(timer);
      };
   }, [dispatch, visualizingShortestPath, visualizeStepDuration]);

   return null;
};
