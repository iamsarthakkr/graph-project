import React from "react";
import styled from "styled-components";
import { EMPTY_GRID_CONTEXT } from "../constants";
import { AppContext, AppContextActions, IAppContext } from "../context";
import {
   RUN_ALGO,
   SET_VISUALIZING_ALGO,
   UPDATE_GRID_DIMENSION,
} from "../context/appActions";
import { IAppContextActions, reducer } from "../context/reducer";
import { AlgorithmVisualizer } from "./AlgorithmVisualizer";
import { Grid } from "./Grid";
import { ShortestPathVisualizer } from "./ShortestPathVisualizer";
import "./App.css";

const Container = styled.div`
   text-align: center;
   width: 100vw;
   height: 100vh;

   display: flex;
   flex-direction: column;
`;

const Header = styled.div`
   padding: 50px 0;
`;

export const App = () => {
   const ref = React.useRef<HTMLDivElement>(null);
   const [appState, dispatch] = React.useReducer<
      React.Reducer<IAppContext, IAppContextActions>
   >(reducer, EMPTY_GRID_CONTEXT);

   console.log({ appState });

   const updateDimensions = () => {
      if (ref.current) {
         const newDimensions = {
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
         };
         dispatch({
            type: UPDATE_GRID_DIMENSION,
            payload: {
               newDimensions,
            },
         });
      }
   };

   React.useLayoutEffect(() => {
      updateDimensions();
   }, []);

   let movement_timer: NodeJS.Timeout | null = null;
   const RESET_TIMEOUT = 100;
   window.addEventListener("resize", () => {
      if (movement_timer != null) clearTimeout(movement_timer);
      movement_timer = setTimeout(updateDimensions, RESET_TIMEOUT);
   });

   const runAlgo = () => {
      console.log("init algo");

      dispatch({ type: RUN_ALGO, payload: { algorithm: "BFS" } });
   };

   const visualizeAlgo = () => {
      console.log("run algo");

      dispatch({
         type: SET_VISUALIZING_ALGO,
         payload: { visualizingAlgo: true },
      });
   };

   return (
      <Container>
         <AppContext.Provider value={appState}>
            <AppContextActions.Provider value={dispatch}>
               <Header>
                  <p>Graph...</p>
                  <button onClick={runAlgo}>Run Algo...</button>
                  <br />
                  <button onClick={visualizeAlgo}>Visualize BFS...</button>
                  <AlgorithmVisualizer />
                  <ShortestPathVisualizer />
               </Header>
               <Grid ref={ref} />
            </AppContextActions.Provider>
         </AppContext.Provider>
      </Container>
   );
};
