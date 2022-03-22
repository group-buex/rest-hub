import React, { FC, useCallback } from "react";
import { motion } from "framer-motion";
import { IUserProject } from "interface/user";
import { format } from "date-fns";

interface ListProps {
  list: IUserProject[];
  onClickItem: (id: string) => void;
}

const Index: FC<ListProps> = ({ list, onClickItem }) => {
  const initDelay = useCallback((index: number) => {
    return index < 5 ? 0.3 * index || 0.15 : 1.5;
  }, []);

  return (
    <>
      {list?.length > 0 &&
        list?.map((item: IUserProject, index: number) => {
          return (
            <motion.div
              key={item._id}
              role="listitem"
              className="w-full bg-[#22272e] cursor-pointer shadow rounded-lg px-8 py-4 relative mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: initDelay(index) }}
              onClick={() => onClickItem(item.projectId)}
            >
              <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-semibold leading-6">
                  {item.title}
                </h2>
                <p className="text-sm leading-6 text-gray-400">
                  {format(new Date(item.createdAt), "dd/MM/yyyy")}
                </p>
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

export default Index;
