import React, { useEffect, useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "@contexts/ThemeContext";
import api from "@core/services/api";
import { UserParams } from "@core/services/api/interfaces";

interface ThemeChangerProps {
  userData?: UserParams;
}

const ThemeChanger = (props: ThemeChangerProps) => {
  const { userData } = props;
  const { dark, setDark } = useContext(ThemeContext);

  const handleTheme = () => {
    setDark(!dark);
    const toggleThemeValue = dark ? false : true;
    const body = {
      ...userData,
      darkTheme: toggleThemeValue,
    };

    api.updateUser(body as UserParams);
  };

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      className="rounded-full p-0 h-10 w-10 mr-1 flex items-center justify-center focus:outline-none hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition duration-200 ease-in-out"
      onClick={handleTheme}
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeChanger;
