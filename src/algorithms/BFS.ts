import { dc, dr, INFINITY } from "../constants";
import { IAlgorithmConfig, IGrid, IGridCell } from "../types";
import { getCellFromHash, hash } from "../utils";

export const BFS = (
   grid: IGrid,
   source: IGridCell,
   destination: IGridCell
): IAlgorithmConfig => {
   console.log("running bfs");

   const maxRow = grid.length - 1,
      maxCol = maxRow > -1 ? grid[0].length - 1 : -1;

   const visited = new Set<number>();
   const BFS_Order: number[][] = [];

   visited.add(hash(source));
   BFS_Order.push([hash(source)]);

   for (let i = 0; i < BFS_Order.length; i++) {
      const next_visited: number[] = [];

      for (const hashVal of BFS_Order[i]) {
         const cell = getCellFromHash(hashVal),
            gridCell = grid[cell.row][cell.column];

         for (let d = 0; d < 4; d++) {
            const nr = cell.row + dr[d],
               nc = cell.column + dc[d];
            if (nr < 0 || nr > maxRow || nc < 0 || nc > maxCol) continue;
            const hashVal = hash({ row: nr, column: nc });
            if (visited.has(hashVal)) continue;

            const nextGridCell = grid[nr][nc];
            nextGridCell.distanceFromSource = gridCell.distanceFromSource + 1;
            nextGridCell.prevCell = gridCell;

            visited.add(hashVal);
            next_visited.push(hashVal);
         }
      }
      if (next_visited.length > 0) BFS_Order.push(next_visited);
   }

   console.log({ grid, source, destination });

   let shortestPath: Array<number> | null = null;
   const { row, column } = destination;
   if (grid[row][column].distanceFromSource !== INFINITY) {
      shortestPath = [];
      let node: IGridCell | null = grid[row][column];
      while (node !== null) {
         shortestPath.push(hash(node));
         node = node.prevCell;
      }
      console.log({ shortestPath });

      shortestPath.reverse();
   }

   return {
      order: BFS_Order,
      shortestPath,
   };
};
