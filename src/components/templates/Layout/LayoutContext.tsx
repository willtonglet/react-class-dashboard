import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface LayoutContextProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const LayoutContext = createContext<LayoutContextProps>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

const LayoutContextProvider: React.FC = (props) => {
  const { children } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <LayoutContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
