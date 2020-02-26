import { isToday, isPast } from "date-fns";

export const focusOnElementById = (id: string, document: Document) => {
  document.getElementById(id)?.focus();
  return document.getElementById(id);
};

export const isOverdue = (deadline: Date) => {
  return isPast(deadline) && !isToday(deadline);
};

export interface ISize {
  size: "mini" | "small" | "tiny" | "large" | "fullscreen";
}

export const getSize = (sizeText: string) => {
  const size: ISize = { size: "mini" };
  if (sizeText === "mini") size.size = "mini";
  else if (sizeText === "small") size.size = "small";
  else if (sizeText === "large") size.size = "large";
  else if (sizeText === "tiny") size.size = "tiny";
  else if (sizeText === "fullscreen") size.size = "fullscreen";

  return size;
};

export const messageErrorSubmit = "Problem submitting data";
export const messageErrorRetrieve = "Problem retrieving data";
