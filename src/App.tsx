import React from "react";
import styled from "styled-components";
import { Grid } from "./components/Grid";

const Container = styled.div`
   text-align: center;
   min-width: 100vw;
   min-height: 100vh;

   display: flex;
   flex-direction: column;
`;

const Header = styled.div`
   padding: 15px 0;
`;

const ROW_FACTOR = 740,
   COL_FACTOR = 1440;

function App() {
   const HEIGHT = 5,
      WIDTH = 5,
      ROWS = ROW_FACTOR / HEIGHT,
      COLUMNS = COL_FACTOR / WIDTH;

   return (
      <Container>
         <Header>Graph Project ...</Header>
         <Grid width={WIDTH} height={HEIGHT} rows={ROWS} columns={COLUMNS} />
      </Container>
   );
}

export default App;
