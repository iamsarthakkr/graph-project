import React from "react";
import styled from "styled-components";
import { Grid } from "./components/Grid";
import { IDimensions } from "./types/GridInterfaces";

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

function App() {
   const HEIGHT = 25,
      WIDTH = 25;

   const ref = React.useRef<HTMLDivElement>(null);
   const [dimensions, setDimension] = React.useState<IDimensions>({
      width: 0,
      height: 0,
   });

   const updateDimensions = () => {
      if (ref.current) {
         setDimension({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
         });
      }
   };

   React.useLayoutEffect(() => {
      updateDimensions();
   }, []);

   let movement_timer: NodeJS.Timeout | null = null;
   const RESET_TIMEOUT = 100;
   window.addEventListener("resize", () => {
      console.log({ movement_timer });

      if (movement_timer) clearTimeout(movement_timer);
      movement_timer = setTimeout(updateDimensions, RESET_TIMEOUT);
   });

   console.log(ref);

   const rows = Math.floor(dimensions.height / HEIGHT) - 1,
      columns = Math.floor(dimensions.width / WIDTH);
   return (
      <Container>
         <Header>Graph Project ...</Header>
         <Grid
            ref={ref}
            rows={rows}
            columns={columns}
            width={WIDTH}
            height={HEIGHT}
         />
      </Container>
   );
}

export default App;
