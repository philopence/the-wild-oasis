import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

export function DarkModeContextProvider({ children }) {
  const systemColorscheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    systemColorscheme,
    "isDarkMode",
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.remove("light-mode");
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
      }
    },
    [isDarkMode],
  );

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  // handle context is null
  if (!context)
    throw new Error(
      "useDarkMode must be used within a DarkModeContextProvider",
    );
  return context;
}
