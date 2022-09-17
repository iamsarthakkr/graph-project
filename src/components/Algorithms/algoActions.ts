import { getCellFromHash, hash } from "../../utils";
import { IAppContext } from "../App/AppContext";
import { IAppContextActions } from "../App/reducer";

export const runBFS = (
   state: IAppContext,
   action: IAppContextActions
): IAppContext => {
   const dr = [1, -1, 0, 0],
      dc = [0, 0, 1, -1];

   const { BFSQueue, rows, visited, destination, algoRunning } = state;

   const maxRow = rows.length - 1,
      maxCol = maxRow > -1 ? rows[0].length - 1 : -1;

   const newBFSQueue = [...BFSQueue];
   const newVisited = new Set<number>([...visited]);
   const newRows = [...rows];

   const first = newBFSQueue[0];
   const cell = getCellFromHash(first),
      gridCell = newRows[cell.row][cell.column],
      currDistance = gridCell.distanceFromSource;

   let reachedDestination = false;
   while (newBFSQueue.length && !reachedDestination) {
      const top = newBFSQueue[0],
         topCell = getCellFromHash(top),
         topGridCell = newRows[topCell.row][topCell.column];

      if (topGridCell.distanceFromSource !== currDistance) break;

      for (let d = 0; d < 4; d++) {
         const nr = topCell.row + dr[d],
            nc = topCell.column + dc[d];
         if (nr < 0 || nr > maxRow || nc < 0 || nc > maxCol) continue;
         const hashVal = hash({ row: nr, column: nc });
         if (newVisited.has(hashVal)) continue;

         const nextGridCell = newRows[nr][nc];
         nextGridCell.distanceFromSource = topGridCell.distanceFromSource + 1;
         nextGridCell.prevCell = topGridCell;

         newVisited.add(hashVal);
         newBFSQueue.push(hashVal);
         if (hashVal === hash(destination)) {
            reachedDestination = true;
            break;
         }
      }
      newBFSQueue.shift();
   }

   return {
      ...state,
      BFSQueue: newBFSQueue,
      rows: newRows,
      visited: newVisited,
      algoRunning: algoRunning && !reachedDestination && newBFSQueue.length > 0,
      pathFound: reachedDestination,
   };
};
