import { ActionType } from "../action-types";

const initialState = {
  currentTime: 0,
  newTime: 0,
};

type Action = {
  type: string;
  payload?: any;
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload,
      };
    case ActionType.SET_NEW_TIME:
      return {
        ...state,
        newTime: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
