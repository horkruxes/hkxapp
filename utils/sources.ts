import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSources = async (): Promise<SourcesHK[]> => {
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

export const addSource = async (url: string): Promise<void> => {
  const sources = await getSources();
  sources.push({ url: url.trim(), enabled: true });
  await AsyncStorage.setItem("@sources", JSON.stringify(sources));
};

export const getActivatedSources = async (): Promise<string[]> => {
  const sources = await getSources();
  return sources.filter((source) => source.enabled).map((source) => source.url);
};
