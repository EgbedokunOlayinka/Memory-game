import {
  Box,
  Container as ChakraContainer,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";
import Board from "./Board";
import Options from "./Options";
import Result from "./Result";
import { useAppState } from "../context/AppContext";

const Container = () => {
  const {
    state: { gameView },
  } = useAppState();
  const bg = useColorModeValue("lightBG", "darkBG");

  return (
    <Box w="full" minH="100vh" bg={bg}>
      <ChakraContainer h="100vh" maxW="container.lg" py={4}>
        <Grid templateRows=".5fr 8fr 1.5fr" h="100%">
          <Header />
          {gameView === "start" ? (
            <Options />
          ) : gameView === "progress" ? (
            <Board />
          ) : gameView === "end" ? (
            <Result />
          ) : null}
          <Footer />
        </Grid>
      </ChakraContainer>
    </Box>
  );
};

export default Container;
