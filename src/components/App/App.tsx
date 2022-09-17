import React from "react";
import styled from "styled-components";
import { AppContext, AppContextActions, IAppContext } from "./AppContext";
import { IAppContextActions, reducer, UPDATE_GRID_DIMENSION } from "./reducer";
import { EMPTY_GRID_CONTEXT } from "../../constants";
import { Grid } from "../Grid/Grid";

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

   const updateDimensions = () => {
      if (ref.current) {
         const newDimensions = {
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
         };
         console.log("dispatching", newDimensions);
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

   return (
      <Container>
         <AppContext.Provider value={appState}>
            <AppContextActions.Provider value={dispatch}>
               <Header>Graph ...</Header>
               <Grid ref={ref} />
            </AppContextActions.Provider>
         </AppContext.Provider>
      </Container>
   );
};