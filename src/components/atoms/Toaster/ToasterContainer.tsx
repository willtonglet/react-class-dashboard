import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ContextClass {
  success: string;
  error: string;
  info: string;
  warning: string;
  default: string;
  dark: string;
}

const contextClass: ContextClass = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

const ToasterContainer = () => {
  return (
    <ToastContainer
      toastClassName={(props) =>
        contextClass[props?.type || "default"] +
        " relative flex p-3 pb-4 mb-2 justify-between overflow-hidden cursor-pointer"
      }
      bodyClassName={() => "text-sm font-white font-med block"}
      position="top-right"
      autoClose={3000}
    />
  );
};

export default ToasterContainer;
