import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

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

export const Navigation = ({ list, subTitle }) => (
  <div className="mb-6">
    <motion.div variants={subTitleVariants} className="z-10 pl-4 mb-2">
      {subTitle}
    </motion.div>
    <motion.ul variants={variants} className="w-[240px] z-10">
      {list?.map((item) => (
        <MenuItem item={item} key={item._id} />
      ))}
    </motion.ul>
  </div>
);
