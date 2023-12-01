import React from "react";

const DEFAULT_STATE = {};

export const ProgressContext = React.createContext(DEFAULT_STATE);

export const ProgressProvider = ProgressContext.Provider;
export const ProgressConsumer = ProgressContext.Consumer;
