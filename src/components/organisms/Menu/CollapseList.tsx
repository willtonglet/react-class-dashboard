import React, { useEffect, useState } from "react";
import { BsFileMinus, BsFilePlus } from "react-icons/bs";

interface CollapseListProps {
  module: number;
  children: React.ReactNode;
  isOpen?: boolean;
}

const CollapseList = (props: CollapseListProps) => {
  const { module, children, isOpen } = props;
  const [openCollapse, setOpenCollapse] = useState(false);

  useEffect(() => {
    isOpen && setOpenCollapse(isOpen);
  }, [isOpen]);

  return (
    <>
      <li
        role="button"
        onClick={() => setOpenCollapse(!openCollapse)}
        className="flex items-center justify-between p-3 transition border-b dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-800 transition duration-150 ease-in-out"
      >
        <span className="font-bold text-sm">Módulo {module}</span>
        {openCollapse ? <BsFileMinus /> : <BsFilePlus />}
      </li>

      {openCollapse && (
        <div className="bg-gray-200 dark:bg-gray-800">
          <ul>{children}</ul>
        </div>
      )}
    </>
  );
};

export default CollapseList;
