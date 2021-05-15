import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import api from "@core/services/api";
import { AppContext } from "@contexts/AppContext";
import { ThemeContext } from "@contexts/ThemeContext";
import Toaster from "@components/atoms/Toaster";
import Layout from "@components/templates/Layout";
import VideoFrame from "@components/templates/VideoFrame";
import ClassInfo from "@components/organisms/ClassInfo";
import CommentsSection from "@components/organisms/CommentsSection";

const ClassPage = () => {
  const { setDark } = useContext(ThemeContext);
  const {
    setData,
    setDataById,
    setUserData,
    setCourseData,
    setCheckedClasses,
  } = useContext(AppContext);
  const { idClass } = useParams<{ idClass?: string }>();
  const { idCourse } = useParams<{ idCourse?: string }>();

  useEffect(() => {
    if (idCourse)
      api
        .findClassByCourseId(idCourse)
        .then((data) => {
          setData && setData(data);
        })
        .catch(() =>
          toast(
            <Toaster type="error">Unexpected error. Try again later."</Toaster>,
            {
              type: "error",
            }
          )
        );

    if (idClass && idCourse)
      api
        .findClassIdByCourseId(idCourse, idClass)
        .then((data) => setDataById && setDataById(data));
  }, [idClass, idCourse, setData, setDataById]);

  useEffect(() => {
    api
      .findUserById(1)
      .then((data) => {
        setUserData && setUserData(data);
        setDark(data.darkTheme);
      })
      .catch(() =>
        toast(
          <Toaster type="error">Unexpected error. Try again later."</Toaster>,
          {
            type: "error",
          }
        )
      );
  }, [setDark, setUserData]);

  useEffect(() => {
    if (idCourse)
      api
        .findCourseById(idCourse)
        .then((data) => setCourseData && setCourseData(data))
        .catch(() =>
          toast(
            <Toaster type="error">Unexpected error. Try again later."</Toaster>,
            {
              type: "error",
            }
          )
        );
  }, [idCourse, setCourseData]);

  useEffect(() => {
    if (idCourse)
      api
        .findCheckedByCourseIdAndUserId(Number(idCourse), 1)
        .then((data) => setCheckedClasses && setCheckedClasses(data))
        .catch(() =>
          toast(
            <Toaster type="error">Unexpected error. Try again later."</Toaster>,
            {
              type: "error",
            }
          )
        );
  }, [idCourse, setCheckedClasses]);

  return (
    <Layout>
      <VideoFrame />
      <ClassInfo />
      <CommentsSection />
    </Layout>
  );
};

export default ClassPage;
