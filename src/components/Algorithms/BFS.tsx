import React from "react";
import { RUN_BFS } from "../App/reducer";
import { useAppContext } from "../App/useAppContext";
import { useAppContextActions } from "../App/useAppContextActions";

export const BFS = () => {
   const { algoRunning } = useAppContext();
   const dispatch = useAppContextActions();

   React.useEffect(() => {
      if (!algoRunning) return;

      const timer = setInterval(() => {
         console.log("inside interval");

         dispatch({ type: RUN_BFS });
      }, 0.00002);
      return () => {
         console.log("clearing up........");

         clearInterval(timer);
      };
   }, [dispatch, algoRunning]);

   return null;
};
