import React from "react";
import { VISUALIZE_ALGO_STEP } from "../context/appActions";
import { useAppContext } from "../context/useAppContext";
import { useAppContextActions } from "../context/useAppContextActions";

export const AlgorithmVisualizer = () => {
   const { visualizingAlgo } = useAppContext();
   const dispatch = useAppContextActions();

   React.useEffect(() => {
      console.log({ visualizingAlgo });
      if (!visualizingAlgo) return;

      const timer = setInterval(() => {
         dispatch({ type: VISUALIZE_ALGO_STEP });
      }, 10);
      return () => {
         console.log("clearing up........");
         clearInterval(timer);
      };
   }, [dispatch, visualizingAlgo]);

   return null;
};
