import { Box, Flex, Text, VStack, Grid, Button } from "@chakra-ui/react";
import ResultItem from "./ResultItem";

const Result = () => {
  const arr = [1, 2, 3, 4];

  return (
    <Flex py={8} justify="center">
      <Box
        background="white"
        maxWidth="500px"
        w="full"
        h="full"
        borderRadius="5"
        p={[4, null, 8]}
      >
        <Text color="primary" fontSize="3xl" align="center" fontWeight="600">
          Player 3 wins!
        </Text>
        <Text color="secondary" align="center" fontWeight="600" mt={2}>
          Game over! Here are the results...
        </Text>

        <VStack align="stretch" mt={4} spacing={4}>
          {arr.map((player) => (
            <ResultItem
              playerNumber={player}
              playerResult={player}
              isWinner={player === 1}
              key={player}
            />
          ))}
        </VStack>

        <Grid templateColumns="1fr 1fr" gap={4} mt={6}>
          <Button
            background="main"
            borderRadius="50"
            color="white"
            _hover={{ opacity: "0.8" }}
            p={6}
          >
            Restart
          </Button>
          <Button
            background="secondary"
            borderRadius="50"
            color="primary"
            _hover={{ opacity: "0.8" }}
            p={6}
          >
            New Game
          </Button>
        </Grid>
      </Box>
    </Flex>
  );
};

export default Result;
