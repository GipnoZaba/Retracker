export const focusOnElementById = (id: string, document: Document) => {
  document.getElementById(id)?.focus();
  return document.getElementById(id);
};

export const messageErrorSubmit = "Problem submitting data";
export const messageErrorRetrieve = "Problem retrieving data";