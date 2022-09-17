import React from "react";
import { AppContext } from "./AppContext";

export const useAppContext = () => React.useContext(AppContext);
