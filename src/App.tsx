import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "./context/AppContext";
import theme from "./theme";
import Container from "./components/Container";
import "./App.css";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppProvider>
      <Container />
    </AppProvider>
  </ChakraProvider>
);
