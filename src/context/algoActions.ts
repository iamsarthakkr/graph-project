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
   const visitingOrder: IVisitingOrder = [...BFSRes.order];

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
