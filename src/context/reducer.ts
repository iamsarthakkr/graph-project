import {
   endCellChangeEvent,
   EndCellChangeEvent,
   END_CELL_CHANGE_EVENT,
   runAlgo,
   RunAlgo,
   RUN_ALGO,
   SetVisualizeAlgo,
   setVisualizeAlgo,
   SetVisualizingShortestPath,
   setVisualizingShortestPath,
   SET_VISUALIZING_ALGO,
   SET_VISUALIZING_SHORTEST_PATH,
   startCellChangeEvent,
   StartCellChangeEvent,
   START_CELL_CHANGE_EVENT,
   updateCellOver,
   UpdateCellOver,
   updateGridDimension,
   UpdateGridDimension,
   updateSource,
   UpdateSource,
   UPDATE_CELL_OVER,
   UPDATE_GRID_DIMENSION,
   UPDATE_SOURCE,
   visualizeAlgoStep,
   VisualizeAlgoStep,
   VisualizeShortestPathStep,
   visualizeShortestPathStep,
   VISUALIZE_ALGO_STEP,
   VISUALIZE_SHORTEST_PATH_STEP,
} from "./appActions";
import { IAppContext } from ".";

export type IAppContextActions =
   | UpdateGridDimension
   | UpdateCellOver
   | UpdateSource
   | StartCellChangeEvent
   | EndCellChangeEvent
   | RunAlgo
   | SetVisualizeAlgo
   | VisualizeAlgoStep
   | SetVisualizingShortestPath
   | VisualizeShortestPathStep;

export const reducer: React.Reducer<IAppContext, IAppContextActions> = (
   state,
   action
) => {
   switch (action.type) {
      case UPDATE_GRID_DIMENSION:
         return updateGridDimension(state, action);
      case RUN_ALGO:
         return runAlgo(state, action);
      case SET_VISUALIZING_ALGO:
         return setVisualizeAlgo(state, action);
      case VISUALIZE_ALGO_STEP:
         return visualizeAlgoStep(state, action);
      case SET_VISUALIZING_SHORTEST_PATH:
         return setVisualizingShortestPath(state, action);
      case VISUALIZE_SHORTEST_PATH_STEP:
         return visualizeShortestPathStep(state, action);
      case UPDATE_CELL_OVER:
         return updateCellOver(state, action);
      case START_CELL_CHANGE_EVENT:
         return startCellChangeEvent(state, action);
      case END_CELL_CHANGE_EVENT:
         return endCellChangeEvent(state, action);
      case UPDATE_SOURCE:
         return updateSource(state, action);
      default:
         return state;
   }
};
