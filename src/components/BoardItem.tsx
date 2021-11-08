import { Box, Center, Text } from "@chakra-ui/react";
import { GameGridSizes, GameBoardItem } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconMapping } from "../utils/iconData";
import { useAppState } from "../context/AppContext";

export interface IBoxComponentProps {
  item: GameBoardItem;
  gridSize: GameGridSizes;
  index: number;
}

const BoardItem = ({
  item: { value, status },
  gridSize,
  index,
}: IBoxComponentProps) => {
  const { checkForMatch } = useAppState();

  const boxClass =
    gridSize === 4
      ? "four-grid-board-item"
      : gridSize === 6
      ? "six-grid-board-item"
      : undefined;

  const bgColor =
    status === "hidden" ? "primary" : status === "open" ? "secondary" : "main";

  const textColor = status === "open" ? "primary" : "white";

  return (
    <Box className={boxClass}>
      <Center
        background={bgColor}
        w="100%"
        h="100%"
        borderRadius="50%"
        fontSize="14px"
        cursor="pointer"
        _hover={{ opacity: status === "hidden" ? "0.8" : "1" }}
        onClick={() => checkForMatch(value, index)}
      >
        {status === "hidden" ? null : typeof value === "string" ? (
          <FontAwesomeIcon icon={iconMapping[value]} size="2x" />
        ) : (
          <Text fontSize="xl" color={textColor} fontWeight="600">
            {value}
          </Text>
        )}
      </Center>
    </Box>
  );
};

export default BoardItem;
