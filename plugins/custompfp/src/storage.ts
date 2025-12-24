import { storage, id } from "@vendetta/plugin";

export interface CustomPFPStorage {
  staticPFP?: string;
  animatedPFP?: string;
}

const defaultStorage: CustomPFPStorage = {
  staticPFP: undefined,
  animatedPFP: undefined,
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

