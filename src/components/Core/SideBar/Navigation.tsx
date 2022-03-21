import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import Link from "next/link";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const subTitleVariants = {
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

export const Navigation = ({ list, subTitle, onClickItem }) => (
  <div className="mb-6">
    <motion.div
      variants={subTitleVariants}
      className="flex flex-row justify-between z-10 px-4 mb-2"
    >
      <p>{subTitle}</p>
      {subTitle.toLowerCase() === "project" && (
        <Link href="/project/new">
          <a>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                fill="#e5e7eb"
              />
            </svg>
          </a>
        </Link>
      )}
    </motion.div>
    <motion.ul variants={variants} className="w-[240px] z-10">
      {list?.map((item) => (
        <MenuItem item={item} key={item._id} onClickItem={onClickItem} />
      ))}
    </motion.ul>
  </div>
);
