import React, { useContext, useReducer } from "react";
import { getSources, SourcesHK } from "../utils/sources";
import { Action, reducer } from "./reducer";

export interface StateContext {
  sources: SourcesHK[];
}
export interface Store {
  state: StateContext;
  dispatch: React.Dispatch<Action>;
}

const defaultState: StateContext = {
  sources: [
    { url: "test2.hk.quimerch.com", enabled: true },
    { url: "test.hk.quimerch.com", enabled: true },
    { url: "hk.quimerch.com", enabled: false },
  ],
};
const sourcesContext = React.createContext<Store>({
  state: defaultState,
  dispatch: () => {},
});

const initializer = async (): Promise<{ sources: SourcesHK[] }> => {
  return { sources: await getSources() };
};

export const useStateContext = () => useContext(sourcesContext);

export const StateProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <sourcesContext.Provider value={{ state, dispatch }} children={children} />
  );
};
