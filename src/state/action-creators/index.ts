import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action, SetCurrentTimeAction } from "../actions";

export const setAudioBlob = (path: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_AUDIO_BLOB,
      payload: path,
    });
  };
};

export const setSubtitleText = (path: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SUBTITLE_TEXT,
      payload: path,
    });
  };
};

export const setCurrentTime = (time: number) => {
  return (dispatch: Dispatch<SetCurrentTimeAction>) => {
    dispatch({
      type: ActionType.SET_CURRENT_TIME,
      payload: time,
    });
  };
};
