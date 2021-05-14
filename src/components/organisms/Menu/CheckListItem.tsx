import React from "react";

interface CheckListItemProps {
  title: string;
  check?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
  isActive?: boolean;
}

const CheckListItem = (props: CheckListItemProps) => {
  const { onChange, onClick, check, title, isActive } = props;

  return (
    <li
      role="button"
      className={`flex items-center p-3 hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-150 ease-in-out ${
        isActive && "bg-gray-300 dark:bg-gray-700"
      }`}
      onClick={onClick}
    >
      <input
        type="checkbox"
        checked={check}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(e)
        }
        className="rounded mr-2 z-10 disabled:opacity-50"
      />

      <span className="font-light text-sm">{title}</span>
    </li>
  );
};

export default CheckListItem;
