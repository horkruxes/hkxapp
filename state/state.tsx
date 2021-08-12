import React, { useContext, useReducer } from "react";
import { SourceHK } from "../utils/sources";
import { Action, reducer } from "./reducer";

export interface StateContext {
  sources: SourceHK[];
  sourcesLoaded: boolean;
}
export interface Store {
  state: StateContext;
  dispatch: React.Dispatch<Action>;
}

const defaultState: StateContext = {
  sources: [],
  sourcesLoaded: false,
};
const sourcesContext = React.createContext<Store>({
  state: defaultState,
  dispatch: () => {},
});

export const useStateContext = () => useContext(sourcesContext);

export const StateProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <sourcesContext.Provider value={{ state, dispatch }} children={children} />
  );
};
