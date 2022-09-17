import { IAppContext } from "./components/App/AppContext";

export const HEIGHT = 25;
export const WIDTH = 25;

export const EMPTY_GRID_CONTEXT: IAppContext = {
   grid: {
      rows: [[]],
   },
   gridDimensions: {
      width: 0,
      height: 0,
   },
   source: { row: 0, column: 0 },
   destination: { row: 0, column: 0 },
};
