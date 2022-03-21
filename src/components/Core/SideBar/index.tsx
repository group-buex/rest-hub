import IUser from "interface/user";
import React, { FC, useRef, useState } from "react";
import Link from "next/link";
import { motion, useCycle } from "framer-motion";

// import IconDoubleArrow from "/assets/double_arrow.svg";
import IconArrowDown from "/assets/keyboard_arrow_down.svg";
import { useDimensions } from "hooks/useDimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import { useRouter } from "next/router";

interface SideBarProps {
  user: IUser;
}

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 20px 20px)`,
    transition: {
      type: "spring",
      stiffness: 10,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at 24px 23px)",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const SideBar: FC<SideBarProps> = ({ user }) => {
  const router = useRouter();
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const handleClickItem = (id: string) => {
    toggleOpen();
    router.push(`/project/${id}`);
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        className="absolute md:top-[67px] top-[57px] bottom-0 z-10 w-[240px] bg-[#1E2A3B]"
        variants={sidebarVariants}
      >
        <div className="mt-12">
          {user.project.length > 0 && (
            <Navigation
              list={user?.project?.slice().reverse()}
              subTitle="Project"
              onClickItem={handleClickItem}
            />
          )}

          <Navigation
            list={user?.shared?.slice().reverse()}
            subTitle="Shared"
            onClickItem={handleClickItem}
          />
        </div>
      </motion.div>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

export default SideBar;
