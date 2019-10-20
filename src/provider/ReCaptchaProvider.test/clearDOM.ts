/**
 * clears the DOM from script, style tags
 * to ensure a "clear DOM" state, between each test
 */
export const clearDOM: () => void = (): void =>
  document.querySelectorAll('script,style').forEach((n: Element) => n.remove());
