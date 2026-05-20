/** Persists pointer position across route changes (dock navigation). */
export const hebiCursorState = {
  x: 0,
  y: 0,
  hasPosition: false,
};

export function rememberCursorPosition(x: number, y: number) {
  hebiCursorState.x = x;
  hebiCursorState.y = y;
  hebiCursorState.hasPosition = true;
}
