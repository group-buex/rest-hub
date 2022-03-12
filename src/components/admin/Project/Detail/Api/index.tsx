import React, { FC, useCallback } from "react";
import { motion } from "framer-motion";
import { IApi } from "interface/api";
import IconArrowDown from "/assets/keyboard_arrow_down.svg";

interface ApiProps {
  list: IApi[];
  onClickTitleItem: (id: string) => void;
}

const Index: FC<ApiProps> = ({ list, onClickTitleItem }) => {
  return (
    <>
      {list.length > 0 &&
        list.map((item: IApi, index: number) => {
          const initDelay = useCallback(() => {
            return index < 7 ? 0.3 * index || 0.15 : 2.1;
          }, []);

          return (
            <motion.div
              key={item._id}
              role="listitem"
              className="flex items-center justify-between w-full bg-white cursor-pointer shadow rounded-lg p-4 relative mb-2 pl-5 pr-5"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: initDelay() }}
              onClick={() => onClickTitleItem(item._id)}
            >
              <div className="flex flex-row gap-5">
                <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                  {item.title}
                </h2>
                <p className="text-base leading-6 text-gray-500">
                  {item.description}
                </p>
              </div>
              <span>
                <IconArrowDown />
              </span>
            </motion.div>
          );
        })}
    </>
  );
};

export default Index;
