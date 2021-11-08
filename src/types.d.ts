import { ReactNode } from "react";

export type TimedTypes = "yes" | "no";
export type GameStates = "start" | "progress" | "end";
export type GameThemes = "numbers" | "icons";
export type GamePlayers = 1 | 2 | 3 | 4;
export type GameGridSizes = 4 | 6;
export type GameGridSizesText = "4x4" | "6x6";
export type ItemStateTypes = "hidden" | "open" | "matched";
export type GameBoardItem = {
  value: string | number;
  status: ItemStateTypes;
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
  | { type: "MAKE_MOVE"; payload: string | number }
  | { type: "CHANGE_GAME_STATE"; payload: GameStates }
  | { type: "SET_GAME_OPTIONS"; payload: GameOptions }
  | { type: "CREATE_GAME_BOARD"; payload: GameBoard }
  | { type: "CHECK_FOR_MATCH"; payload: GameBoard }
  | { type: "SET_PLAYER_STATE"; payload: GamePlayerDataType[] }
  | { type: "SET_PLAYER_TIME"; payload: GamePlayerDataType[] }
  | { type: "FINISH_PLAYER_TIME"; payload: GamePlayerDataType[] }
  | { type: "SCORE_PLAYER_PAIR"; payload: GamePlayerDataType[] }
  | { type: "SELECT_NEXT_PLAYER"; payload: GamePlayerDataType[] };

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
  moves: number;
  currentMove: string | number | null;
};

export type AppProviderProps = { children: ReactNode };

export type AppContextType = {
  state: State;
  dispatch: Dispatch;
  changeGameState: (gameState: GameStates) => void;
  resetGame: () => void;
  restartGame: () => void;
  setGameOptions: (gameOptions: GameOptions) => void;
  setPlayerTime: (seconds: number | null) => void;
  finishPlayerTime: (player: GamePlayers) => void;
  scorePairToPlayer: (player: GamePlayers) => void;
  checkForMatch: (value: string | number, index: number) => void;
};
