import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { convertSecsToMins } from "../utils/appFunctions";
import { useAppState } from "../context/AppContext";
import { GamePlayerDataType } from "../types";

export interface IComponentProps {
  color: string;
  player: GamePlayerDataType;
}

const Timer = ({
  color,
  player: { isFinished, isPlaying, secondsLeft, playerNum },
}: IComponentProps) => {
  const { setPlayerTime, finishPlayerTime } = useAppState();

  const { min, sec } = convertSecsToMins(secondsLeft as number);

  const [[mins, secs], setTime] = useState([min, sec]);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      finishPlayerTime(playerNum);
      return null;
    } else if (mins >= 1 && secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  // const reset = () =>
  //   setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  useEffect(() => {
    if (isPlaying && !isFinished) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  // console.log({ mins, secs });

  return (
    <Text color={color} fontSize="sm">
      {`${mins}:${secs.toString().padStart(2, "0")}`}
    </Text>
  );
};

export default Timer;
