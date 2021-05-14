import React from "react";
import { BsCheck, BsExclamation, BsInfo, BsX } from "react-icons/bs";

interface ToasterProps {
  type?: "info" | "success" | "warning" | "error" | "default";
  children: React.ReactNode;
}

const Toaster = (props: ToasterProps) => {
  const { type = "default", children } = props;

  const handleTypeIcon = () => {
    switch (type) {
      case "info":
        return <BsInfo size={21} className="mr-2" />;
      case "success":
        return <BsCheck size={21} className="mr-2" />;
      case "warning":
        return <BsExclamation size={21} className="mr-2" />;
      case "error":
        return <BsX size={21} className="mr-2" />;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex align-center">
      {handleTypeIcon()}
      {children}
    </div>
  );
};

export default Toaster;
