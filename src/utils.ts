import { Bang } from "@/types.ts";
import { data } from "@/data.ts";

export const PLACEHOLDER = "{{{s}}}";
const DEFAULT_URL = "https://duckduckgo.com/?q={{{s}}}";

export const getUrlStore = () => {
  return localStorage.getItem("default-url") || DEFAULT_URL;
};

export const setUrlStore = (url: string) => {
  localStorage.setItem("default-url", url);
};

export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const getBangs = async (): Promise<Bang[]> => {
  try {
    return data;
  } catch (e) {
    return [];
  }
};
