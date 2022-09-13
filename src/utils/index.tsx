export const get2DArray = (rows: number, columns: number) => {
   const array: number[][] = [] as number[][];
   for (let r = 0; r < rows; r++) {
      array.push([]);
      for (let c = 0; c < columns; c++) array[r].push(0);
   }
   return array;
};

export const convertToPixels = (num: number): string => {
   return `${num}px`;
};
