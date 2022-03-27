import React, { FC } from "react";
import { ReactNode } from "typings";
import { forwardRef } from "../system/forward-ref";
import { cx } from "../system/core";
import { motion } from "framer-motion";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  tapScale?: number;
  transparent?: boolean;
  onClick?: (e: any) => void;
}

const Button: FC<ButtonProps> = forwardRef<ButtonProps, "button">(
  (
    {
      children,
      className,
      hoverScale = 1.05,
      tapScale = 0.9,
      transparent = false,
      onClick,
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cx(
          !transparent &&
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-[38px] rounded focus:outline-none focus:shadow-outline",
          className
        )}
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }
);

export default Button;
