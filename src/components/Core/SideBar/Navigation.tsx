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

export const Navigation = ({ user }) => (
  <>
    <motion.ul variants={variants} className="w-[240px] z-10 pl-6">
      {user?.project?.map((item) => (
        <MenuItem item={item} key={item._id} />
      ))}
    </motion.ul>
  </>
);

const itemIds = [0, 1, 2, 3, 4];