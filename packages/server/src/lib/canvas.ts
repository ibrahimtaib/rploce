import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

export type Canvas = string[][];

export const canvas: Canvas = JSON.parse(
  readFileSync(
    fileURLToPath(new URL('canvas.json', import.meta.url))
  ).toString()
);

export function saveCanvas(canvas: Canvas) {
  const canvasJson = JSON.stringify(canvas, null, 2);

  // Write the JSON data to the file
  writeFileSync(
    fileURLToPath(new URL('canvas.json', import.meta.url)),
    canvasJson
  );
}
