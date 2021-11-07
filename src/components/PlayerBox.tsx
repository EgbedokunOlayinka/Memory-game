import { Flex, Text, useMediaQuery, Box } from "@chakra-ui/react";
import { GamePlayerDataType } from "../types";
import Timer from "./Timer";

export interface IComponentProps {
  player: GamePlayerDataType;
}

const PlayerBox = ({ player }: IComponentProps) => {
  const { playerNum, pairs, isPlaying, isFinished, secondsLeft } = player;

  const [isLargerThan650] = useMediaQuery("(min-width: 650px)");
  const bgColor = isPlaying ? "main" : isFinished ? "grey" : "tertiary";
  const textColor = isPlaying ? "white" : "primary";

  return (
    <Flex
      background={bgColor}
      align="center"
      justify="space-between"
      h={isLargerThan650 ? "50px" : "100%"}
      borderRadius="5"
      maxWidth={isLargerThan650 ? "200px" : "660px"}
      width="100%"
      minWidth="100px"
      px={4}
    >
      <Box>
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {`Player ${playerNum}`}
        </Text>
        {secondsLeft ? <Timer color={textColor} player={player} /> : null}
      </Box>
      <Text color={textColor} fontWeight="600" fontSize="xl">
        {pairs}
      </Text>
    </Flex>
  );
};

export default PlayerBox;
