import { Center, useMediaQuery, Grid } from "@chakra-ui/react";
import BoardItem from "./BoardItem";
import { useAppState } from "../context/AppContext";

const Board = () => {
  const {
    state: { gridSize, gameBoard },
  } = useAppState();

  const [isLargerThan650] = useMediaQuery("(min-width: 650px)");
  const spaceValue = isLargerThan650 ? 12 : 6;

  const gridClass =
    gridSize === 4
      ? "four-grid-board"
      : gridSize === 6
      ? "six-grid-board"
      : undefined;

  return (
    <Center my={spaceValue}>
      <Grid maxWidth="500px" className={gridClass}>
        {gameBoard?.map((item, index) => (
          <BoardItem
            key={index}
            item={item}
            index={index}
            gridSize={gridSize}
          />
        ))}
      </Grid>
    </Center>
  );
};

export default Board;
