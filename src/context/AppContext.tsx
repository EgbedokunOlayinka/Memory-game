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
  GameBoardItem,
  GameBoard,
  ItemStateTypes,
} from "../types";
import { AppReducer, initialState } from "./AppReducer";
import {
  createNumbersObject,
  createIconsObject,
  createPlayers,
  setPlayerTimeFunc,
  finishPlayerTimeFunc,
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
        status: "hidden" as ItemStateTypes,
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

  const setPlayerTime = (seconds: number | null) => {
    const newPlayerArr = setPlayerTimeFunc(state.gamePlayers, seconds);

    dispatch({
      type: "SET_PLAYER_TIME",
      payload: newPlayerArr,
    });
  };

  const finishPlayerTime = (player: GamePlayers) => {
    const newPlayerArr = finishPlayerTimeFunc(state.gamePlayers, player);

    dispatch({
      type: "FINISH_PLAYER_TIME",
      payload: newPlayerArr,
    });
  };

  const scorePairToPlayer = () => {
    const newPlayerArr = (state.gamePlayers as any[]).map(
      (playerData: GamePlayerDataType) => {
        if (playerData.isPlaying) {
          playerData.pairs += 1;
        }
        return playerData;
      }
    );

    dispatch({
      type: "SCORE_PLAYER_PAIR",
      payload: newPlayerArr,
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

  const checkForMatch = (value: string | number, index: number) => {
    const initialMove = state.moves % 2 === 0;

    let newGameBoardArr: GameBoard;

    const checkMatch = value === state.currentMove;

    if (initialMove) {
      newGameBoardArr = (state.gameBoard as any[]).map(
        (item: GameBoardItem, idx: number) => {
          if (item.value === value && idx === index) {
            item.status = "open";
          }
          return item;
        }
      );
    } else if (checkMatch) {
      newGameBoardArr = (state.gameBoard as any[]).map(
        (item: GameBoardItem, idx: number) => {
          if (item.value === value) {
            item.status = "matched";
          }
          return item;
        }
      );
      scorePairToPlayer();
    } else {
      newGameBoardArr = (state.gameBoard as any[]).map(
        (item: GameBoardItem, idx: number) => {
          if (item.value === value && idx === index) {
            item.status = "open";
          }
          return item;
        }
      );
    }

    dispatch({
      type: "MAKE_MOVE",
      payload: value,
    });

    dispatch({
      type: "CHECK_FOR_MATCH",
      payload: newGameBoardArr,
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
    scorePairToPlayer,
    checkForMatch,
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
