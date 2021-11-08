import { Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
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
  const {
    setPlayerTime,
    finishPlayerTime,
    state: { moves, timed },
  } = useAppState();

  const mounted = useRef(false);

  const { min, sec } = convertSecsToMins(secondsLeft as number);

  const [[mins, secs], setTime] = useState([min, sec]);
  const [secondsUsed, setSecondsUsed] = useState(0);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      finishPlayerTime(playerNum);
      return null;
    } else if (mins >= 1 && secs === 0) {
      setSecondsUsed((prev) => prev + 1);
      setTime([mins - 1, 59]);
    } else {
      setSecondsUsed((prev) => prev + 1);
      setTime([mins, secs - 1]);
    }
  };

  useEffect(() => {
    if (isPlaying && !isFinished) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  useEffect(() => {
    const { min: newMin, sec: newSec } = convertSecsToMins(
      secondsLeft as number
    );
    setTime([newMin, newSec]);
  }, [secondsLeft]);

  useEffect(() => {
    if (!isPlaying || !mounted.current) return;

    if (timed) {
      setPlayerTime(secondsUsed);
    } else {
      setPlayerTime(null);
    }
  }, [moves]);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Text color={color} fontSize="sm">
      {`${mins}:${secs.toString().padStart(2, "0")}`}
    </Text>
  );
};

export default Timer;
