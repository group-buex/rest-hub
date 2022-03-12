import React, { FC, useCallback } from "react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { IApi } from "interface/api";
import { projectApiState } from "states/project";

import ReactDragListView from "components/ReactDragListView";

import IconArrowDown from "/assets/keyboard_arrow_down.svg";
import IconDrag from "/assets/drag.svg";

interface ApiProps {
  onClickTitleItem: (id: string) => void;
}

const Index: FC<ApiProps> = ({ onClickTitleItem }) => {
  const [projectApiList, setProjectApiList] = useRecoilState(projectApiState);
  const { api } = projectApiList;

  const handleDragEnd = (fromIndex, toIndex) => {
    const temp = Object.assign(api).slice();
    const item = temp.splice(fromIndex, 1)[0];
    temp.splice(toIndex, 0, item);
    setProjectApiList({ ...projectApiList, api: [...temp] });
  };

  const initDelay = useCallback(
    (index) => (index < 5 ? 0.3 * index || 0.15 : 1.5),
    []
  );

  return (
    <ReactDragListView
      onDragEnd={handleDragEnd}
      nodeSelector="li"
      handleSelector="a"
    >
      <ol>
        {api.map((item: IApi, index: number) => (
          <motion.li
            key={item._id}
            role="listitem"
            className="flex items-center justify-between w-full bg-white cursor-pointer shadow rounded-lg p-4 relative mb-2 pl-5 pr-5"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: initDelay(index) }}
            onClick={() => onClickTitleItem(item._id)}
          >
            <div className="flex flex-row gap-5">
              {item.title}
              <p className="text-base leading-6 text-gray-500">
                {item.description}
              </p>
            </div>
            <div className="flex flex-row">
              <span>
                <IconArrowDown />
              </span>
              <a href="#">
                <IconDrag />
              </a>
            </div>
          </motion.li>
        ))}
      </ol>
    </ReactDragListView>
  );
};

export default Index;
