import React from "react";
import { GET_SHORTEST_PATH } from "../App/reducer";
import { useAppContext } from "../App/useAppContext";
import { useAppContextActions } from "../App/useAppContextActions";

export const GetShortestPath = () => {
   const state = useAppContext();
   const { pathFound, shortestPath } = state;
   const dispatch = useAppContextActions();

   React.useEffect(() => {
      if (!pathFound || shortestPath.length) return;

      console.log({ state });
      dispatch({ type: GET_SHORTEST_PATH });
   }, [dispatch, pathFound, state, shortestPath]);

   return null;
};
