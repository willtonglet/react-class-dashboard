import React, { useRef } from "react";
import ClassNav from "@components/organisms/ClassNav";
import Header from "@components/organisms/Header";
import Menu from "@components/organisms/Menu";
import ToasterContainer from "@components/atoms/Toaster/ToasterContainer";
import LayoutContextProvider from "./LayoutContext";
import { StyledMain } from "./styles";

const Layout: React.FC = (props) => {
  const { children } = props;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHeight = Number(
    headerRef.current?.getBoundingClientRect().height
  );

  return (
    <LayoutContextProvider>
      <ToasterContainer />
      <Header ref={headerRef} />
      <div className="flex h-full dark:bg-gray-900">
        <Menu headerHeight={headerHeight} />
        <StyledMain
          className="flex-1 overflow-scroll dark:text-gray-400"
          headerHeight={headerHeight}
        >
          <ClassNav />
          {children}
        </StyledMain>
      </div>
    </LayoutContextProvider>
  );
};

export default Layout;
