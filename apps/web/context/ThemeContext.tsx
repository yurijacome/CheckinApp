'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
  "--background": "#f5f5f5",

  "--themeColor1": "rgb(255, 255, 255)", // cor clara principal
  "--themeColor2": "rgb(0, 0, 0)",  // cor escura para textos

};

const darkTheme = {
  "--background": "#181818",

  "--themeColor1": "rgb(0, 0, 0)", // cor clara principal
  "--themeColor2": "rgb(255, 255, 255)",  // cor escura para textos



};

function setCSSVariables(themeVars: Record<string, string>) {
  Object.entries(themeVars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (theme === "light") {
      setCSSVariables(lightTheme);
    } else {
      setCSSVariables(darkTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
