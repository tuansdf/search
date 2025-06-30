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

export const getBangs = async (): Promise<{ u: string; t: string }[]> => {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) return [];
    return response.json();
  } catch (e) {
    return [];
  }
};
