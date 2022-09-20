import { BFS } from "../algorithms";
import { IVisitingOrder } from "../types";
import { IAppContext } from ".";

export const runBFS = (state: IAppContext): IAppContext => {
   const { rows, source, destination } = state;

   const newRows = rows.map((row) => row.map((cell) => ({ ...cell })));

   const BFSRes = BFS(newRows, source, destination);
   console.log({ BFSRes });

   const newSource = newRows[source.row][source.column];
   const newDestination = newRows[destination.row][destination.column];

   // generating visiting order
   const visitingOrder: IVisitingOrder = [];
   for (let i = 0; i < BFSRes.order.length; i++) {
      visitingOrder.push({ visitingTime: i, visitedNodes: [] });
      for (const hashVal of BFSRes.order[i]) {
         visitingOrder[i].visitedNodes.push(hashVal);
      }
   }

   return {
      ...state,
      rows: newRows,
      algorithmConfig: BFSRes,
      source: newSource,
      destination: newDestination,
      visitingOrder,
      shortestPath: BFSRes.shortestPath ? BFSRes.shortestPath : [],
   };
};
