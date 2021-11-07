import { Flex, Text } from "@chakra-ui/react";

export interface IComponentProps {
  playerNumber: number;
  isWinner: boolean;
  playerResult: number;
}

const ResultItem = ({
  playerNumber,
  playerResult,
  isWinner,
}: IComponentProps) => {
  const bgColor = isWinner ? "primary" : "secondary";
  const textColor = isWinner ? "white" : "primary";

  return (
    <Flex
      bg={bgColor}
      justify="space-between"
      align="center"
      p={4}
      borderRadius="5"
    >
      <Text color={textColor} fontSize="sm" fontWeight="600">
        {`Player ${playerNumber} ${isWinner ? "(winner)" : ""}`}
      </Text>
      <Text color={textColor} fontWeight="600" fontSize="lg">
        {playerResult + " pair" + (playerResult > 1 ? "s" : "")}
      </Text>
    </Flex>
  );
};

export default ResultItem;
