import { storage, id } from "@vendetta/plugin";

export interface CustomPFPStorage {
  staticPFP?: string;
  animatedPFP?: string;
  banner?: string;
  badges?: number[];
  clanTag?: string;
  clanBadgeHash?: string;
  globalName?: string;
  username?: string;
  bot?: boolean;
  system?: boolean;
  nitro?: boolean;
}

const defaultStorage: CustomPFPStorage = {
  staticPFP: undefined,
  animatedPFP: undefined,
  banner: undefined,
  badges: [],
  clanTag: undefined,
  clanBadgeHash: undefined,
  globalName: undefined,
  username: undefined,
  bot: undefined,
  system: undefined,
  nitro: undefined,
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
