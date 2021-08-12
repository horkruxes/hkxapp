import { SourceHK } from "../utils/sources";
import { StateContext } from "./state";

export enum ActionType {
  ADD_SOURCE,
  TOGGLE_SOURCE,
  REMOVE_SOURCE,
  LOAD_SOURCES_INIT,
}

export type Action = {
  type: ActionType;
  payload: SourceHK[];
};

export const reducer = (state: StateContext, action: Action): StateContext => {
  switch (action.type) {
    case ActionType.ADD_SOURCE:
      const already = state.sources.filter(
        (source) => source.url === action.payload[0].url
      );
      if (!already || already.length === 0) {
        state.sources.push(action.payload[0]);
      }
      return state;

    case ActionType.TOGGLE_SOURCE:
      return {
        ...state,
        sources: state.sources.map((source) =>
          source.url === action.payload[0].url
            ? { ...source, enabled: !source.enabled }
            : source
        ),
      };
    case ActionType.REMOVE_SOURCE:
      return {
        ...state,
        sources: state.sources.filter(
          (source) => source.url === action.payload[0].url
        ),
      };
    case ActionType.LOAD_SOURCES_INIT:
      return {
        sourcesLoaded: true,
        sources: action.payload,
      };
    default:
      throw new Error("Not among actions");
  }
};
