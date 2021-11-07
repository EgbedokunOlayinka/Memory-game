import { createContext, useContext, useReducer } from "react";
import {
  AppProviderProps,
  AppContextType,
  GameStates,
  GameOptions,
  GameGridSizes,
  GameThemes,
  GamePlayers,
  GamePlayerDataType,
} from "../types";
import { AppReducer, initialState } from "./AppReducer";
import {
  createNumbersObject,
  createIconsObject,
  createPlayers,
} from "../utils/appFunctions";

const AppStateContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const changeGameState = (gameState: GameStates) => {
    dispatch({
      type: "CHANGE_GAME_STATE",
      payload: gameState,
    });
  };

  const createGameBoard = (gridSize: GameGridSizes, theme: GameThemes) => {
    const randomArr =
      theme === "icons"
        ? createIconsObject(gridSize)
        : createNumbersObject(gridSize);

    const gameBoardArr = (randomArr as any[]).map((item: string | number) => {
      return {
        value: item,
        matched: false,
      };
    });

    // console.log(gameBoardArr);

    dispatch({
      type: "CREATE_GAME_BOARD",
      payload: gameBoardArr,
    });
  };

  const createPlayerState = (
    numOfPlayers: GamePlayers,
    gameTime: number | null
  ) => {
    dispatch({
      type: "SET_PLAYER_STATE",
      payload: createPlayers(numOfPlayers, gameTime),
    });
  };

  const setGameOptions = (gameOptions: GameOptions) => {
    dispatch({
      type: "SET_GAME_OPTIONS",
      payload: gameOptions,
    });
    const { gridSize, theme, numOfPlayers, gameTime } = gameOptions;

    createGameBoard(gridSize, theme);
    createPlayerState(numOfPlayers, gameTime);
  };

  const setPlayerTime = (player: GamePlayers, seconds: number) => {
    const notFinishedArr = (state.gamePlayers as any[]).filter(
      (playerData: GamePlayerDataType) => !playerData.isFinished
    );

    const currentPlayerIndex = (notFinishedArr as any[]).findIndex(
      (playerData: GamePlayerDataType) => playerData.isPlaying
    );

    const nextPlayerIndex =
      currentPlayerIndex === notFinishedArr.length - 1
        ? 0
        : currentPlayerIndex + 1;

    const newPlayerArr = (state.gamePlayers as any[]).map(
      (playerData: GamePlayerDataType) => {
        if (
          playerData.playerNum === player &&
          playerData.secondsLeft &&
          !playerData.isFinished &&
          playerData.isPlaying
        ) {
          playerData.secondsLeft -= seconds;
          playerData.isPlaying = false;
        } else if (
          playerData.playerNum === notFinishedArr[nextPlayerIndex].playerNum
        ) {
          playerData.isPlaying = true;
        }
        return playerData;
      }
    );

    dispatch({
      type: "SET_PLAYER_TIME",
      payload: newPlayerArr,
    });
  };

  const finishPlayerTime = (player: GamePlayers) => {
    const notFinishedArr = (state.gamePlayers as any[]).filter(
      (playerData: GamePlayerDataType) => !playerData.isFinished
    );

    const currentPlayerIndex = (notFinishedArr as any[]).findIndex(
      (playerData: GamePlayerDataType) => playerData.isPlaying
    );

    const nextPlayerIndex =
      currentPlayerIndex === notFinishedArr.length - 1
        ? 0
        : currentPlayerIndex + 1;

    const newArr = (state.gamePlayers as any[]).map(
      (playerData: GamePlayerDataType) => {
        if (
          playerData.playerNum === player &&
          playerData.secondsLeft &&
          !playerData.isFinished &&
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

    dispatch({
      type: "FINISH_PLAYER_TIME",
      payload: newArr,
    });
  };

  const restartGame = () => {
    dispatch({
      type: "RESTART_GAME",
    });
  };

  const resetGame = () => {
    dispatch({
      type: "RESET_GAME",
    });
  };

  const value = {
    state,
    dispatch,
    changeGameState,
    restartGame,
    resetGame,
    setGameOptions,
    setPlayerTime,
    finishPlayerTime,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("UseAppState must be used within an AppProvider");
  }

  return context;
}

export { AppProvider, useAppState };
