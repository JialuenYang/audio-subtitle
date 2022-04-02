import { ActionType } from "../action-types";

interface SetPathAction {
  type: ActionType.SET_AUDIO_BLOB | ActionType.SET_SUBTITLE_TEXT;
  payload: string;
}

export interface SetCurrentTimeAction {
  type: ActionType.SET_CURRENT_TIME;
  payload: number;
}

export type Action = SetPathAction;
