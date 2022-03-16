import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const ProjectNoneContents = () => {
  return (
    <Link href="/project/new" passHref>
      <motion.a
        role="noneContents"
        className="flex flex-col justify-center w-full bg-white cursor-pointer shadow rounded-lg p-8 relative mb-5"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <p className="flex justify-center text-base leading-6 text-gray-500">
          Create a New Rest Hub
        </p>
      </motion.a>
    </Link>
  );
};

export default ProjectNoneContents;
