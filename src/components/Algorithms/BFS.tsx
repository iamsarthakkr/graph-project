import React from "react";
import { RUN_BFS } from "../App/reducer";
import { useAppContext } from "../App/useAppContext";
import { useAppContextActions } from "../App/useAppContextActions";

export const BFS = () => {
   const { algoRunning } = useAppContext();
   const dispatch = useAppContextActions();

   React.useEffect(() => {
      console.log({ algoRunning });
      if (!algoRunning) return;

      const timer = setInterval(() => {
         dispatch({ type: RUN_BFS });
      }, 10);
      return () => {
         console.log("clearing up........");
         clearInterval(timer);
      };
   }, [dispatch, algoRunning]);

   return null;
};
