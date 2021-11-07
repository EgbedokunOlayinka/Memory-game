import { ReactNode } from "react";

export type TimedTypes = "yes" | "no";
export type GameStates = "start" | "progress" | "end";
export type GameThemes = "numbers" | "icons";
export type GamePlayers = 1 | 2 | 3 | 4;
export type GameGridSizes = 4 | 6;
export type GameGridSizesText = "4x4" | "6x6";
export type GameBoardItem = {
  value: string | number;
  matched: boolean;
};
export type GameBoard = Array<GameBoardItem>;
export type GamePlayerDataType = {
  playerNum: GamePlayers;
  pairs: number;
  isPlaying: boolean;
  isFinished: boolean;
  secondsLeft: number | null;
};

export type GameOptions = {
  theme: GameThemes;
  numOfPlayers: GamePlayers;
  gridSize: GameGridSizes;
  timed: boolean;
  gameTime: number | null;
};

export type Action =
  | { type: "RESET_GAME" }
  | { type: "RESTART_GAME" }
  | { type: "CHANGE_GAME_STATE"; payload: GameStates }
  | { type: "SET_GAME_OPTIONS"; payload: GameOptions }
  | { type: "CREATE_GAME_BOARD"; payload: GameBoard }
  | { type: "SET_PLAYER_STATE"; payload: GamePlayerDataType[] }
  | { type: "SET_PLAYER_TIME"; payload: GamePlayerDataType[] }
  | { type: "FINISH_PLAYER_TIME"; payload: GamePlayerDataType[] };

export type Dispatch = (action: Action) => void;

export type State = {
  gameView: GameStates;
  theme: GameThemes;
  numOfPlayers: GamePlayers;
  gridSize: GameGridSizes;
  gameBoard: GameBoard;
  timed: boolean;
  gameTime: number | null;
  gameWinner: number | null;
  gamePlayers: GamePlayerDataType[] | [];
};

export type AppProviderProps = { children: ReactNode };

export type AppContextType = {
  state: State;
  dispatch: Dispatch;
  changeGameState: (gameState: GameStates) => void;
  resetGame: () => void;
  restartGame: () => void;
  setGameOptions: (gameOptions: GameOptions) => void;
  setPlayerTime: (player: GamePlayers, seconds: number) => void;
  finishPlayerTime: (player: GamePlayers) => void;
};
