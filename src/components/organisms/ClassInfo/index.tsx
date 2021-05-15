import React, { useContext } from "react";
import { AppContext } from "@contexts/AppContext";

const ClassInfo = () => {
  const { dataById } = useContext(AppContext);

  return (
    <div className="p-6 flex-1">
      <span className="text-sm text-gray-400">Module {dataById?.module}</span>
      <h2 className="dark:text-white font-bold text-2xl mb-5">
        {dataById?.title}
      </h2>
      <div className="font-light">{dataById?.description}</div>
    </div>
  );
};

export default ClassInfo;
