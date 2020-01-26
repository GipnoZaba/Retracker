export const focusOnElementById = (id: string, document: Document) => {
  document.getElementById(id)?.focus();
  return document.getElementById(id);
};
