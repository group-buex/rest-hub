import React, { FC, useCallback } from "react";
import { motion } from "framer-motion";
import { IProject } from "interface/project";
import { format } from "date-fns";

interface ListProps {
  list: IProject[];
  onClickItem: (id: string) => void;
}

const Index: FC<ListProps> = ({ list, onClickItem }) => {
  return (
    <>
      {list.length > 0 &&
        list.map((item: IProject, index: number) => {
          const initDelay = useCallback(() => {
            return index < 5 ? 0.3 * index || 0.15 : 1.5;
          }, []);

          return (
            <motion.div
              key={item._id}
              role="listitem"
              className="w-full bg-white cursor-pointer shadow rounded-lg p-8 relative mb-5"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: initDelay() }}
              onClick={() => onClickItem(item._id)}
            >
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-semibold leading-6 text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm leading-6 text-gray-400">
                  {format(new Date(item.createdAt), "dd/MM/yyyy")}
                </p>
              </div>
              <p className="text-base leading-6 mt-4 text-gray-500">
                {item.description}
              </p>
            </motion.div>
          );
        })}
    </>
  );
};

export default Index;
