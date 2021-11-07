import { Center, Text, Circle } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import {
  GameGridSizes,
  GameThemes,
  GamePlayers,
  GameGridSizesText,
} from "../types";

export interface IComponentProps {
  value: GameGridSizes | GamePlayers | GameThemes;
  outputValue?: GameGridSizesText | GamePlayers | GameThemes;
  selected: boolean;
  rounded: boolean;
  valueKey: "theme" | "gridSize" | "numPlayers";
  setTheme?: Dispatch<SetStateAction<GameThemes>>;
  setGridSize?: Dispatch<SetStateAction<GameGridSizes>>;
  setNumOfPlayers?: Dispatch<SetStateAction<GamePlayers>>;
}

const OptionsItem = ({
  value,
  outputValue,
  selected,
  rounded,
  valueKey,
  setTheme,
  setGridSize,
  setNumOfPlayers,
}: IComponentProps) => {
  const clickHandler = () => {
    if (valueKey === "theme" && setTheme) {
      setTheme(value as GameThemes);
    } else if (valueKey === "gridSize" && setGridSize) {
      setGridSize(value as GameGridSizes);
    } else if (valueKey === "numPlayers" && setNumOfPlayers) {
      setNumOfPlayers(value as GamePlayers);
    } else {
      return null;
    }
  };

  return rounded ? (
    <Circle
      background={selected ? "primary" : "secondary"}
      _hover={{ opacity: selected ? "1" : "0.8" }}
      size="50px"
      p={3}
      cursor="pointer"
      onClick={() => clickHandler()}
    >
      <Text color="white" fontWeight="600" textTransform="capitalize">
        {outputValue ?? value}
      </Text>
    </Circle>
  ) : (
    <Center
      background={selected ? "primary" : "secondary"}
      _hover={{ opacity: selected ? "1" : "0.8" }}
      borderRadius="50"
      w="full"
      h="full"
      p={3}
      cursor="pointer"
      onClick={() => clickHandler()}
    >
      <Text color="white" fontWeight="600" textTransform="capitalize">
        {outputValue ?? value}
      </Text>
    </Center>
  );
};

export default OptionsItem;
