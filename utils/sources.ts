import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSourcesStorage = async (): Promise<SourcesHK[]> => {
  const potentialSources = await AsyncStorage.getItem("@sources");
  if (potentialSources) {
    return JSON.parse(potentialSources);
  } else {
    return [];
  }
};

export type SourcesHK = {
  url: string;
  enabled: boolean;
};

export const toggleSourceStorage = async (
  urlToToggle: string
): Promise<void> => {
  const sources = await getSourcesStorage();
  const sourcesSwitched = sources.map((source) =>
    source.url === urlToToggle
      ? { ...source, enabled: !source.enabled }
      : source
  );
  await AsyncStorage.setItem("@sources", JSON.stringify(sourcesSwitched));
};

export const addSourceStorage = async (url: string): Promise<void> => {
  const sources = await getSourcesStorage();
  sources.push({ url: url.trim(), enabled: true });
  await AsyncStorage.setItem("@sources", JSON.stringify(sources));
};

export const getActivatedSources = async (): Promise<string[]> => {
  const sources = await getSourcesStorage();
  return sources.filter((source) => source.enabled).map((source) => source.url);
};
