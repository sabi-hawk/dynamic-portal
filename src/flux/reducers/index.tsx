'use client';
import { combineReducers } from "redux";
import chatReducer from "./chat";
import authReducer from "./auth";
import extrasReducer from "./extras";
import settingsReducer from "./settings";
import storage from "redux-persist/lib/storage";

const initialState = {};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "RESET_STATE":
      storage.removeItem("persist:root");
      return initialState;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  root: rootReducer,
  chats: chatReducer,
  auth: authReducer,
  extras: extrasReducer,
  settings: settingsReducer,
});


export const LOGOUT = "LOGOUT";
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
export default appReducer;


