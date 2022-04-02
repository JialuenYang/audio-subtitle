import { ActionType } from "../action-types";

const initialState = {
  audioBlob: "",
  subtitleText: "",
  subtitleArray: [],
};

type Action = {
  type: string;
  payload?: any;
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_AUDIO_BLOB:
      return {
        ...state,
        audioBlob: action.payload,
      };
    case ActionType.SET_SUBTITLE_TEXT:
      return {
        ...state,
        subtitleText: action.payload,
      };
    case ActionType.SET_SUBTITLE_ARRAY:
      return {
        ...state,
        subtitleArray: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
