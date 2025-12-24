import { storage, id } from "@vendetta/plugin";

export interface CustomPFPStorage {
  staticPFP?: string;
  animatedPFP?: string;
  banner?: string;
  badges?: number[];
}

const defaultStorage: CustomPFPStorage = {
  staticPFP: undefined,
  animatedPFP: undefined,
  banner: undefined,
  badges: [],
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
