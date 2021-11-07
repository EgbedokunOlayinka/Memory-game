import { State, Action } from "../types";

const initialState: State = {
  gameView: "start",
  theme: "numbers",
  numOfPlayers: 1,
  gridSize: 4,
  gameBoard: [],
  timed: true,
  gameTime: 3,
  gameWinner: null,
  gamePlayers: [],
};

function AppReducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE_GAME_STATE": {
      return {
        ...state,
        gameView: action.payload,
      };
    }
    case "SET_GAME_OPTIONS": {
      const { theme, numOfPlayers, gridSize, timed, gameTime } = action.payload;
      return {
        ...state,
        gameView: "progress",
        theme,
        numOfPlayers,
        gridSize,
        timed,
        gameTime,
      };
    }
    case "CREATE_GAME_BOARD": {
      return {
        ...state,
        gameBoard: action.payload,
      };
    }
    case "SET_PLAYER_STATE": {
      return {
        ...state,
        gamePlayers: action.payload,
      };
    }
    case "SET_PLAYER_TIME": {
      return {
        ...state,
        gamePlayers: action.payload,
      };
    }
    case "FINISH_PLAYER_TIME": {
      return {
        ...state,
        gamePlayers: action.payload,
      };
    }
    case "RESET_GAME": {
      return initialState;
    }
    case "RESTART_GAME": {
      return initialState;
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
}

export { AppReducer, initialState };
