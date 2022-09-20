export interface IAlgorithmConfig {
   order: Array<Array<number>>;
   shortestPath: Array<number> | null;
}

export type IAlgorithm = "BFS" | "NONE";
export type IVisitedNodes = {
   visitingTime: number;
   visitedNodes: Array<number>;
};

export type IVisitingOrder = Array<IVisitedNodes>;
