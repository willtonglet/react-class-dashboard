import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CheckListItem from "./CheckListItem";
import CollapseList from "./CollapseList";
import Toaster from "@components/atoms/Toaster";
import Progress from "@components/atoms/Progress";
import api from "@core/services/api";
import { LayoutContext } from "@components/templates/Layout/LayoutContext";
import { useMediaQuery } from "@core/hooks/useMediaQuery";
import { AppContext } from "@contexts/AppContext";
import { mq } from "@core/styles/mq";
import {
  CheckedParams,
  ClassWithCheckParams,
} from "@core/services/api/interfaces";
import { StyledMenu } from "./styles";

export interface MenuProps {
  headerHeight?: number;
}

const Menu = (props: MenuProps) => {
  const { headerHeight } = props;
  const { data, dataById, checkedClasses, setCheckedClasses } =
    useContext(AppContext);
  const [progressData, setProgressData] =
    useState<{
      percentage: string;
      partial: number;
      all: number;
    }>();
  const { isMenuOpen, setIsMenuOpen } = useContext(LayoutContext);
  const { idCourse } = useParams<{ idCourse?: string }>();
  const matchMedia = useMediaQuery(mq.lg);
  const history = useHistory();
  const modulesArr = Array.from(new Set(data?.map((item) => item.module)));

  const dataArrWithCheck = data?.map((obj) => ({
    ...obj,
    ...checkedClasses?.find((item) => item.classId === obj.id),
  }));

  const handleIsChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    val: CheckedParams
  ) => {
    const body = {
      id: val.id,
      classId: val.classId,
      courseId: val.courseId,
      userId: val.userId,
      checked: e.target.checked,
    };

    e.target.checked &&
      toast(<Toaster type="success">Aula Concluída!</Toaster>, {
        type: "success",
      });

    api
      .updateCheckedClass(body)
      .then(() =>
        api
          .findCheckedByCourseIdAndUserId(val.courseId, 1)
          .then((data) => setCheckedClasses && setCheckedClasses(data))
      );
  };

  useEffect(() => {
    const handleProgressClass = (data: CheckedParams[]) => {
      const partial = data.filter((item) => item.checked).length;
      const all = data.length;

      return {
        percentage: (100 * Number(partial)) / all,
        partial,
        all,
      };
    };

    checkedClasses &&
      setProgressData({
        percentage: handleProgressClass(checkedClasses).percentage.toFixed(),
        partial: handleProgressClass(checkedClasses).partial,
        all: handleProgressClass(checkedClasses).all,
      });
  }, [checkedClasses, idCourse]);

  useEffect(() => {
    matchMedia ? setIsMenuOpen(true) : setIsMenuOpen(false);
  }, [matchMedia, setIsMenuOpen]);

  return (
    <StyledMenu
      isMenuOpen={isMenuOpen}
      headerHeight={headerHeight}
      className={`border-r h-screen z-50 overflow-scroll fixed lg:relative 
      ${isMenuOpen ? "w-10/12 sm:w-5/12 lg:w-2/12" : ""} 
      overflow-hidden bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700`}
    >
      <div className="wrapper">
        {progressData && (
          <div className="p-3 flex items-center border-b bg-gray-50 dark:bg-gray-900 dark:border-gray-700 sticky top-0">
            <Progress
              size={48}
              progress={progressData?.percentage}
              strokeWidth={2.5}
            />

            <span className="text-sm ml-2 font-light text-gray-400 leading-4">
              {progressData.partial} de {progressData.all}
              <br />
              aulas completas
            </span>
          </div>
        )}
        <ul>
          {modulesArr?.sort().map((module, index) => (
            <CollapseList
              module={module}
              key={index}
              isOpen={dataById?.module === module}
            >
              {dataArrWithCheck
                ?.filter((item) => item.module === module)
                .sort((a, b) => Number(a.order) - Number(b.order))
                .map((item) => (
                  <CheckListItem
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleIsChecked(e, item as ClassWithCheckParams)
                    }
                    onClick={() => history.push(`/${item.courseId}/${item.id}`)}
                    isActive={dataById?.id === item.id}
                    check={item.checked}
                    title={`${item.order} - ${item.title}`}
                    key={item.order}
                  />
                ))}
            </CollapseList>
          ))}
        </ul>
      </div>
    </StyledMenu>
  );
};

export default Menu;
