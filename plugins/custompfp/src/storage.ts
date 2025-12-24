import { storage, id } from "@vendetta/plugin";

export interface CustomPFPStorage {
  staticPFP?: string;
  animatedPFP?: string;
  banner?: string;
  badges?: number[];
  globalName?: string;
  username?: string;
  bot?: boolean;
  system?: boolean;
}

const defaultStorage: CustomPFPStorage = {
  staticPFP: undefined,
  animatedPFP: undefined,
  banner: undefined,
  badges: [],
  globalName: undefined,
  username: undefined,
  bot: undefined,
  system: undefined,
};

const STORAGE_KEY = `custompfp_${id}`;

export const getStorage = (): CustomPFPStorage => {
  return storage[STORAGE_KEY] ?? defaultStorage;
};

export const setStorage = (data: Partial<CustomPFPStorage>) => {
  storage[STORAGE_KEY] = {
    ...getStorage(),
    ...data,
  };
};
