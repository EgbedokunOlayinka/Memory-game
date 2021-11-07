import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  useMediaQuery,
  Checkbox,
  Grid,
  useNumberInput,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  LightMode,
} from "@chakra-ui/react";
import OptionsItem from "./OptionsItem";
import { useAppState } from "../context/AppContext";
import { useState } from "react";
import { GameGridSizes, GameThemes, GamePlayers } from "../types";

const Options = () => {
  const { setGameOptions } = useAppState();

  const [theme, setTheme] = useState<GameThemes>("numbers");
  const [numOfPlayers, setNumOfPlayers] = useState<GamePlayers>(1);
  const [gridSize, setGridSize] = useState<GameGridSizes>(4);
  const [timed, setTimed] = useState<boolean>(true);

  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const rounded = !isLargerThan450;

  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    step: 1,
    min: 1,
    max: 30,
    defaultValue: 3,
  });

  const inc = timed ? getIncrementButtonProps() : null;
  const dec = timed ? getDecrementButtonProps() : null;
  const input = getInputProps();

  const setGameOptionsHandler = () => {
    setGameOptions({
      theme,
      numOfPlayers,
      gridSize,
      timed,
      gameTime: timed ? valueAsNumber : null,
    });
  };

  return (
    <Flex py={12} justify="center">
      <VStack
        background="white"
        maxWidth="500px"
        w="full"
        h="full"
        borderRadius="5"
        align="stretch"
        p={[4, null, 8]}
        spacing={8}
      >
        <Box>
          <Text color="primary" fontSize="md" mb={4}>
            Select Theme
          </Text>
          <Flex align="center" justify="space-between" className="options-flex">
            <OptionsItem
              value="numbers"
              selected={theme === "numbers"}
              rounded={false}
              setTheme={setTheme}
              valueKey="theme"
            />
            <OptionsItem
              value="icons"
              selected={theme === "icons"}
              rounded={false}
              setTheme={setTheme}
              valueKey="theme"
            />
          </Flex>
        </Box>
        <Box>
          <Text color="primary" fontSize="md" mb={4}>
            Number of players
          </Text>
          <Flex align="center" justify="space-between" className="options-flex">
            <OptionsItem
              value={1}
              selected={numOfPlayers === 1}
              rounded={rounded}
              setNumOfPlayers={setNumOfPlayers}
              valueKey="numPlayers"
            />
            <OptionsItem
              value={2}
              selected={numOfPlayers === 2}
              rounded={rounded}
              setNumOfPlayers={setNumOfPlayers}
              valueKey="numPlayers"
            />
            <OptionsItem
              value={3}
              selected={numOfPlayers === 3}
              rounded={rounded}
              setNumOfPlayers={setNumOfPlayers}
              valueKey="numPlayers"
            />
            <OptionsItem
              value={4}
              selected={numOfPlayers === 4}
              rounded={rounded}
              setNumOfPlayers={setNumOfPlayers}
              valueKey="numPlayers"
            />
          </Flex>
        </Box>
        <Box>
          <Text color="primary" fontSize="md" mb={4}>
            Grid Size
          </Text>
          <Flex align="center" justify="space-between" className="options-flex">
            <OptionsItem
              value={4}
              outputValue="4x4"
              selected={gridSize === 4}
              rounded={false}
              setGridSize={setGridSize}
              valueKey="gridSize"
            />
            <OptionsItem
              value={6}
              outputValue="6x6"
              selected={gridSize === 6}
              rounded={false}
              setGridSize={setGridSize}
              valueKey="gridSize"
            />
          </Flex>
        </Box>
        <Grid
          // templateColumns={["1fr", null, "1fr 1fr"]}
          gap={8}
          align="center"
        >
          <Checkbox
            isChecked={timed}
            onChange={(e) => setTimed((prev) => !prev)}
          >
            <Text color="primary" fontSize="md">
              Timed Game (Max: 30 minutes)
            </Text>
          </Checkbox>
          <LightMode>
            <HStack>
              <Button
                {...dec}
                bg="primary"
                color="white"
                _hover={{ opacity: "0.85" }}
              >
                -
              </Button>
              <InputGroup borderColor="secondary">
                <Input {...input} isDisabled={!timed} color="primary" />
                <InputRightAddon>
                  <Text color="primary">mins</Text>
                </InputRightAddon>
              </InputGroup>
              <Button
                {...inc}
                bg="primary"
                color="white"
                _hover={{ opacity: "0.85" }}
              >
                +
              </Button>
            </HStack>
          </LightMode>
        </Grid>
        <Button
          background="main"
          borderRadius="50"
          color="white"
          _hover={{ opacity: "0.8" }}
          p={6}
          onClick={(e) => setGameOptionsHandler()}
        >
          Start Game
        </Button>
      </VStack>
    </Flex>
  );
};

export default Options;
