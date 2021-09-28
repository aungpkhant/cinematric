import React, { useState, useEffect, useContext, createContext } from "react";

const appUiContext = createContext();

// * Wraps children with Provider for Consumers (down the dom tree) to subscribe to
export function AppUiStateProvider({ children }) {
  const [appUiState, setAppUiState] = useState({
    sidebarMovieGenresExpanded: false,
    sidebarTvGenresExpanded: false,
  });

  return (
    <appUiContext.Provider value={[appUiState, setAppUiState]}>
      {children}
    </appUiContext.Provider>
  );
}

// * Consumer hook with abstraction layer for state manipulation logic
// * With useContext we dont need to wrap with Consumer explicitly
export function useAppUiState() {
  const context = React.useContext(appUiContext);
  if (!context) {
    throw new Error(`useAppUiState must be used within a AppUiStateProvider`);
  }

  const [appUiState, setAppUiState] = context;

  const toggleSidebarMovieGenresExpansion = () => {
    setAppUiState((prev) => ({
      ...prev,
      sidebarMovieGenresExpanded: !prev.sidebarMovieGenresExpanded,
    }));
  };

  const toggleSidebarTvGenresExpansion = () => {
    setAppUiState((prev) => ({
      ...prev,
      sidebarTvGenresExpanded: !prev.sidebarTvGenresExpanded,
    }));
  };

  return {
    appUiState,
    toggleSidebarMovieGenresExpansion,
    toggleSidebarTvGenresExpansion,
  };
}
