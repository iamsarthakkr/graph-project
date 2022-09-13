import React from "react";
import styled from "styled-components";

const Container = styled.div`
   text-align: center;
   width: 100vw;
   height: 100vh;

   display: flex;
   flex-direction: column;
`;

const Header = styled.div`
   border: 1px solid blue;
   padding: 15px 0;
`;

function App() {
   return (
      <Container>
         <Header>Graph Project ...</Header>
      </Container>
   );
}

export default App;
