export interface IAlgorithmConfig {
   order: Array<number>;
   shortestPath: Array<number>;
}

export type IAlgorithm = "BFS" | "NONE";
export type IVisitingOrder = Array<number>;
