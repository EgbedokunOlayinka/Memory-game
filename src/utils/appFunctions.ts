import { iconData } from "./iconData";
import { GamePlayers, GamePlayerDataType } from "../types";

export const countOccurrences = (arr: number[], val: number) =>
  arr.reduce((a, b) => (b === val ? a + 1 : a), 0);

export const createNumbersObject = (size: number): number[] => {
  const totalSize = size * size;
  const totalHalf = totalSize / 2;

  const boardArr = [];

  // while the length of the board array is less than the totalSize, generate a random number between 1 and totalHalf and check if it doesn't already occur twice before adding it to the board array
  while (boardArr.length < totalSize) {
    const randomNumber = Math.floor(Math.random() * totalHalf) + 1;
    if (countOccurrences(boardArr, randomNumber) >= 2) {
      continue;
    } else {
      boardArr.push(randomNumber);
    }
  }

  return boardArr;
};

export const createIconsObject = (size: number): string[] => {
  const totalSize = size * size;
  const totalHalf = totalSize / 2;

  let iconArray = [...iconData];

  // if the gridSize is 4, the array should consist of 8 randomly chosen icons, else, use the original icon array
  if (size === 4) {
    const randomArr: string[] = [];
    while (randomArr.length < totalHalf) {
      const randNum = Math.floor(Math.random() * totalSize) + 1;
      if (randomArr.includes(iconData[randNum])) {
        continue;
      } else {
        randomArr.push(iconData[randNum]);
      }
    }
    iconArray = randomArr;
  }

  const boardArr: string[] = [];

  while (boardArr.length < totalSize) {
    const randomNumber = Math.floor(Math.random() * iconArray.length);
    const randomIcon = iconArray[randomNumber];

    const filteredArr = boardArr.filter((item) => item === randomIcon);

    if (!filteredArr) {
      continue;
    }

    if (filteredArr.length >= 2) {
      continue;
    } else {
      boardArr.push(randomIcon);
    }
  }

  return boardArr;
};

export const createPlayers = (
  numOfPlayers: GamePlayers,
  gameTime: number | null
): GamePlayerDataType[] => {
  const playerArr = [];

  for (let i = 1; i <= numOfPlayers; i++) {
    const playerObj: GamePlayerDataType = {
      playerNum: i as GamePlayers,
      pairs: 0,
      isPlaying: i === 1,
      isFinished: false,
      secondsLeft: gameTime ? gameTime * 60 : null,
    };

    playerArr.push(playerObj);
  }

  // console.log(playerArr);
  return playerArr;
};

export const convertSecsToMins = (
  seconds: number
): { min: number; sec: number } => {
  const min = seconds >= 60 ? Math.floor(seconds / 60) : 0;
  const sec = seconds >= 60 ? seconds % 60 : seconds;

  return { min, sec };
};

export const finishPlayerTimeFunc = (
  playerArr: GamePlayerDataType[],
  player: GamePlayers
): GamePlayerDataType[] => {
  const notFinishedArr = (playerArr as any[]).filter(
    (playerData: GamePlayerDataType) => !playerData.isFinished
  );

  const currentPlayerIndex = (notFinishedArr as any[]).findIndex(
    (playerData: GamePlayerDataType) => playerData.isPlaying
  );

  const nextPlayerIndex =
    currentPlayerIndex === notFinishedArr.length - 1
      ? 0
      : currentPlayerIndex + 1;

  const newPlayerArr = (playerArr as any[]).map(
    (playerData: GamePlayerDataType) => {
      if (
        playerData.playerNum === player &&
        !playerData.isFinished &&
        playerData.secondsLeft &&
        playerData.isPlaying
      ) {
        playerData.isPlaying = false;
        playerData.isFinished = true;
        playerData.secondsLeft = 0;
      } else if (
        playerData.playerNum === notFinishedArr[nextPlayerIndex].playerNum
      ) {
        playerData.isPlaying = true;
      }
      return playerData;
    }
  );

  // console.log(newPlayerArr);
  return newPlayerArr;
};

export const setPlayerTimeFunc = (
  playerArr: GamePlayerDataType[],
  seconds: number | null
): GamePlayerDataType[] => {
  const notFinishedArr = (playerArr as any[]).filter(
    (playerData: GamePlayerDataType) => !playerData.isFinished
  );

  const currentPlayerIndex = (notFinishedArr as any[]).findIndex(
    (playerData: GamePlayerDataType) => playerData.isPlaying
  );

  const nextPlayerIndex =
    currentPlayerIndex === notFinishedArr.length - 1
      ? 0
      : currentPlayerIndex + 1;

  const newPlayerArr = (playerArr as any[]).map(
    (playerData: GamePlayerDataType) => {
      if (!playerData.isFinished && playerData.isPlaying) {
        playerData.secondsLeft =
          typeof seconds === "number"
            ? (playerData.secondsLeft as number) - seconds
            : null;
        playerData.isPlaying = false;
      } else if (
        playerData.playerNum === notFinishedArr[nextPlayerIndex].playerNum
      ) {
        playerData.isPlaying = true;
      }
      return playerData;
    }
  );

  return newPlayerArr;
};
