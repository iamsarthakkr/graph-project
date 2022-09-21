import React from "react";
import { visualizeStepDurations } from "../constants";
import { VISUALIZE_ALGO_STEP } from "../context/appActions";
import { useAppContext } from "../context/useAppContext";
import { useAppContextActions } from "../context/useAppContextActions";

export const AlgorithmVisualizer = () => {
   const { visualizingAlgo, visualizeStepDuration } = useAppContext();
   const dispatch = useAppContextActions();
   console.log("------> duration:", { visualizeStepDuration });

   React.useEffect(() => {
      console.log({ visualizingAlgo });
      if (!visualizingAlgo) return;

      if (visualizeStepDuration === visualizeStepDurations.INSTANT) {
         dispatch({ type: VISUALIZE_ALGO_STEP, payload: { animate: false } });
      }

      const timer = setInterval(() => {
         dispatch({ type: VISUALIZE_ALGO_STEP, payload: { animate: true } });
      }, visualizeStepDuration);
      return () => {
         console.log("clearing up........");
         clearInterval(timer);
      };
   }, [dispatch, visualizingAlgo, visualizeStepDuration]);

   return null;
};
