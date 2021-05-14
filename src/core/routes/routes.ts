import ClassPage from "@pages/class";

export const routes = [
  {
    path: "/",
    to: "/1/1",
    redirect: true,
    exact: true,
  },
  {
    path: "/1",
    to: "/1/1",
    redirect: true,
    exact: true,
  },
  {
    path: "/:idCourse",
    component: ClassPage,
    exact: true,
  },
  {
    path: "/:idCourse/:idClass",
    component: ClassPage,
  },
];
