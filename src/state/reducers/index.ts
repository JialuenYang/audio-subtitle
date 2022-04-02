import { combineReducers } from "redux";
import fileReducer from "./fileReducer";
import playerReducer from "./playerReducer";

const reducers = combineReducers({
  files: fileReducer,
  player: playerReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
