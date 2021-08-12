import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSourcesStorage = async (): Promise<SourceHK[]> => {
  const potentialSources = await AsyncStorage.getItem("@sources");
  if (potentialSources) {
    return JSON.parse(potentialSources);
  } else {
    return [];
  }
};

export type SourceHK = {
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

export const addSourceStorage = async (urlGiven: string): Promise<void> => {
  const url = urlGiven.trim().toLowerCase();
  if (url) {
    const sources = await getSourcesStorage();
    sources.push({ url, enabled: true });
    await AsyncStorage.setItem("@sources", JSON.stringify(sources));
  }
};

export const deleteSourceStorage = async (urlGiven: string): Promise<void> => {
  const url = urlGiven.trim().toLowerCase();
  if (url) {
    const sources = await getSourcesStorage();
    const newSources = sources.filter((source) => source.url !== urlGiven);
    await AsyncStorage.setItem("@sources", JSON.stringify(newSources));
  }
};

export const deleteAllSourceStorage = async (): Promise<void> => {
  console.log("removes all");

  await AsyncStorage.removeItem("@sources");
};

export const getActivatedSources = async (): Promise<string[]> => {
  const sources = await getSourcesStorage();
  return sources.filter((source) => source.enabled).map((source) => source.url);
};
