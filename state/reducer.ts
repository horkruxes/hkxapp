import { addSource, SourcesHK } from "../utils/sources";
import { StateContext } from "./state";

export enum ActionType {
  ADD_SOURCE,
  TOGGLE_SOURCE,
  REMOVE_SOURCE,
}

export type Action = {
  type: ActionType;
  payload: string;
};

export const reducer = (state: StateContext, action: Action): StateContext => {
  switch (action.type) {
    case ActionType.ADD_SOURCE:
      const already = state.sources.filter(
        (source) => source.url === action.payload
      );
      if (!already || already.length === 0) {
        state.sources.push({ url: action.payload, enabled: true });
      }
      return state;

    case ActionType.TOGGLE_SOURCE:
      return {
        sources: state.sources.map((source) =>
          source.url === action.payload
            ? { ...source, enabled: !source.enabled }
            : source
        ),
      };
    case ActionType.REMOVE_SOURCE:
      return {
        sources: state.sources.filter(
          (source) => source.url === action.payload
        ),
      };
    default:
      throw new Error("Not among actions");
  }
};
