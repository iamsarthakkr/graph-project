import React from "react";
import { ADD_TO_SHORTEST_PATH } from "../App/reducer";
import { useAppContext } from "../App/useAppContext";
import { useAppContextActions } from "../App/useAppContextActions";

export const ShortestPath = () => {
   const state = useAppContext();
   const { shortestPath } = state;
   const dispatch = useAppContextActions();

   React.useEffect(() => {
      if (shortestPath.length === 0) return;
      console.log({ shortestPath });

      console.log({ state });
      setTimeout(() => {
         dispatch({ type: ADD_TO_SHORTEST_PATH });
      }, 10);
   }, [dispatch, state, shortestPath]);

   return null;
};
