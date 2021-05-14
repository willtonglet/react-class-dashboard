import React, { useContext } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { useHistory, useParams } from "react-router";
import { AppContext } from "@contexts/AppContext";
import api from "@core/services/api";
import { ClassParams } from "@core/services/api/interfaces";

const ClassNav = () => {
  const { data, dataById } = useContext(AppContext);
  const history = useHistory();
  const { idCourse } = useParams<{ idCourse?: string }>();

  const currentCourseData = data?.filter(
    (bt) => bt.courseId === Number(idCourse)
  );

  const prevButton = currentCourseData?.find(
    (bt) => bt.order === Number(dataById?.order) - 1
  );

  const nextButton = currentCourseData?.find(
    (bt) => bt.order === Number(dataById?.order) + 1
  );

  const handleClick = (button: ClassParams) => {
    const body = {
      ...button,
      viewedAt: new Date().toString(),
    };
    api.updateClass(body);
    history.push(`/${button.courseId}/${button.id}`);
  };

  return (
    <div className="flex-1 bg-gray-900 border-b border-gray-700 text-white flex justify-between sticky top-0 z-40">
      <div className="flex-1 border-r border-gray-700">
        {prevButton && (
          <button
            className="flex w-full items-center px-3 py-4 focus:outline-none hover:bg-gray-800 transition duration-200"
            onClick={() => handleClick(prevButton)}
          >
            <VscChevronLeft size={24} className="text-gray-400" />
            <div className="flex flex-col items-start leading-tight ml-2 font-light">
              <span className="text-sm text-gray-400">Aula Anterior</span>
              <span className="font-medium">{prevButton.title}</span>
            </div>
          </button>
        )}
      </div>
      <div className="flex-1">
        {nextButton && (
          <button
            className="flex w-full items-center justify-end px-3 py-4 focus:outline-none hover:bg-gray-800 transition duration-200"
            onClick={() => handleClick(nextButton)}
          >
            <div className="flex flex-col justify-end leading-tight text-right mr-2 font-light">
              <span className="text-sm text-gray-400">Aula Anterior</span>
              <span className="font-medium">{nextButton.title}</span>
            </div>
            <VscChevronRight size={24} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassNav;
