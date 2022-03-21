import { FC } from "react";
import { motion } from "framer-motion";
import { IProjectApi } from "interface/project";

interface MenuItemProps {
  item: IProjectApi;
  onClickItem: (id: string) => void;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 10,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const IconSend = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.01 6.03L11.52 9.25L4 8.25L4.01 6.03ZM11.51 14.75L4 17.97V15.75L11.51 14.75ZM2.01 3L2 10L17 12L2 14L2.01 21L23 12L2.01 3Z"
        fill="#c7cfda"
      />
    </svg>
  );
};

export const MenuItem: FC<MenuItemProps> = ({ item, onClickItem }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.05, backgroundColor: "#FFF", color: "black" }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer px-4 py-1 rounded"
      onClick={() => onClickItem(item.projectId)}
    >
      <button className="flex items-center gap-3">
        <IconSend /> {item.title}
      </button>
    </motion.li>
  );
};
