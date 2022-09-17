import { IGrid, IPoint } from "../types/GridInterfaces";

export const get2DArray = <Type,>(
   rows: number,
   columns: number,
   defaultVal: Type
) => {
   const array: Type[][] = [] as Type[][];
   for (let r = 0; r < rows; r++) {
      array.push([]);
      for (let c = 0; c < columns; c++) array[r].push(defaultVal);
   }
   return array;
};

export const convertToPixels = (num: number): string => {
   return `${num}px`;
};

export const getRandomPoint = (maxX: number, maxY: number): IPoint => {
   const x = Math.floor(Math.random() * (maxX + 1)),
      y = Math.floor(Math.random() * (maxY + 1));

   return { x, y };
};

export const getEmptyGrid = (rows: number, columns: number): IGrid => {
   return {
      rows: get2DArray(rows, columns, { row: 0, column: 0 }).map((row, i) =>
         row.map((cell, j) => ({ row: i, column: j }))
      ),
   };
};
