import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ThemeContextProps {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  dark: false,
  setDark: () => {},
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
