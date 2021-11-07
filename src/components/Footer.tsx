import { Flex, useMediaQuery, Grid } from "@chakra-ui/react";
import PlayerBox from "./PlayerBox";
import { useAppState } from "../context/AppContext";
import { GamePlayerDataType } from "../types";

const Footer = () => {
  const {
    state: { gameView, numOfPlayers, gamePlayers },
  } = useAppState();

  const [isLargerThan650] = useMediaQuery("(min-width: 650px)");

  if (gameView !== "progress") {
    return null;
  }

  return isLargerThan650 ? (
    <Flex justify="space-between" flexWrap="wrap" className="footer-flex">
      {(gamePlayers as any[]).map((player: GamePlayerDataType) => (
        <PlayerBox player={player} key={player.playerNum} />
      ))}
    </Flex>
  ) : (
    <Grid templateColumns="1fr 1fr" templateRows="1fr 1fr" gap="1rem">
      {(gamePlayers as any[]).map((player: GamePlayerDataType) => (
        <PlayerBox player={player} key={player.playerNum} />
      ))}
    </Grid>
  );
};

export default Footer;
