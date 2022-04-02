import { ActionType } from "../action-types";

type SrtParser = {
  id: string;
  startTime: Number;
  endTime: Number;
  text: string;
}[];

interface SetPathAction {
  type: ActionType.SET_AUDIO_BLOB | ActionType.SET_SUBTITLE_TEXT;
  payload: string;
}

export interface SetSubtitleArrayAction {
  type: ActionType.SET_SUBTITLE_ARRAY;
  payload: SrtParser;
}

export interface SetTimeAction {
  type: ActionType.SET_CURRENT_TIME | ActionType.SET_NEW_TIME;
  payload: number;
}

export type Action = SetPathAction;
