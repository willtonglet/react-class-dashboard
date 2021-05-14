import React, { useContext } from "react";
import { BsList } from "react-icons/bs";
import { VscChevronLeft } from "react-icons/vsc";
import { LayoutContext } from "@components/templates/Layout/LayoutContext";
import ThemeChanger from "@components/atoms/ThemeChanger";
import UserAvatar from "@components/atoms/UserAvatar";
import { AppContext } from "@contexts/AppContext";

const Header = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { userData, courseData } = useContext(AppContext);
  const { setIsMenuOpen, isMenuOpen } = useContext(LayoutContext);

  return (
    <div
      ref={ref}
      className="w-full border-b flex justify-between items-center dark:bg-gray-900 dark:text-white dark:border-gray-700"
    >
      <div className="flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-500 py-4 px-2 border-r focus:outline-none transition duration-200 dark:bg-gray-900 dark:active:bg-gray-800 dark:border-gray-700"
        >
          {!isMenuOpen ? <BsList size={24} /> : <VscChevronLeft size={24} />}
        </button>
        <h1 className="ml-4 font-bold">{courseData?.name}</h1>
      </div>
      <div className="flex items-center mr-3">
        <ThemeChanger userData={userData} />
        <UserAvatar userName={userData?.name} />
      </div>
    </div>
  );
});

export default Header;
