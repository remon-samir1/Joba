import React, { createContext, useEffect, useState } from "react";
export const WindowSize = createContext();
const WindowSizeContext = ({ children }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));

    return () => {
      window.addEventListener("resize", () => setWindowSize(window.innerWidth));
    };
  }, []);
  return (
    <WindowSize.Provider value={{ windowSize, setWindowSize }}>
      {children}
    </WindowSize.Provider>
  );
};

export default WindowSizeContext;
