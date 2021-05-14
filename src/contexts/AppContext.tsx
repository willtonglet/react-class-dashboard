import { createContext, Dispatch, SetStateAction, useState } from "react";
import {
  CheckedParams,
  ClassParams,
  CommentParams,
  CourseParams,
  UserParams,
} from "@core/services/api/interfaces";

interface AppContextProps {
  data?: ClassParams[];
  setData?: Dispatch<SetStateAction<ClassParams[] | undefined>>;
  dataById?: ClassParams;
  setDataById?: Dispatch<SetStateAction<ClassParams | undefined>>;
  userData?: UserParams;
  setUserData?: Dispatch<SetStateAction<UserParams | undefined>>;
  courseData?: CourseParams;
  setCourseData?: Dispatch<SetStateAction<CourseParams | undefined>>;
  commentsData?: CommentParams[];
  setCommentsData?: Dispatch<SetStateAction<CommentParams[] | undefined>>;
  checkedClasses?: CheckedParams[];
  setCheckedClasses?: Dispatch<SetStateAction<CheckedParams[] | undefined>>;
}

export const AppContext = createContext<AppContextProps>({});

export const AppProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ClassParams[]>();
  const [dataById, setDataById] = useState<ClassParams>();
  const [userData, setUserData] = useState<UserParams>();
  const [courseData, setCourseData] = useState<CourseParams>();
  const [commentsData, setCommentsData] = useState<CommentParams[]>();
  const [checkedClasses, setCheckedClasses] = useState<CheckedParams[]>();

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        dataById,
        setDataById,
        userData,
        setUserData,
        courseData,
        setCourseData,
        checkedClasses,
        setCheckedClasses,
        commentsData,
        setCommentsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
