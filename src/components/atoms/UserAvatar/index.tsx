import React from "react";

interface UserAvatarProps {
  userName?: string | undefined;
  size?: "sm" | "md";
  className?: string;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { userName, size = "md", className } = props;

  const handleSize = {
    circle: size === "sm" ? 6 : 10,
    text: size === "sm" ? "xs" : "md",
  };

  const avatarInitials = (name?: string) => {
    return name
      ?.split(" ")
      .map((str) => str[0])
      .splice(0, 2)
      .join("");
  };

  return (
    <button
      className={`rounded-full font-light p-0 h-${handleSize.circle} w-${handleSize.circle} text-${handleSize.text} flex items-center text-white justify-center focus:outline-none bg-pink-500 ${className}`}
    >
      {avatarInitials(userName)}
    </button>
  );
};

export default UserAvatar;
