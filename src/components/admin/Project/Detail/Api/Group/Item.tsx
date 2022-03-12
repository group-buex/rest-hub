import React, { FC, useCallback } from "react";
import { motion } from "framer-motion";

import GroupItemList from "../GroupItemList";

import { IApi } from "interface/api";
import IconArrowDown from "/assets/keyboard_arrow_down.svg";
import IconSort from "/assets/sort.svg";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { selectedApiGroupState } from "states/project";
import ReactDragListView from "components/ReactDragListView";

interface ApiGroupItemProps {
  api: IApi[];
  onClickGroup: (item: IApi) => void;
}

const ApiGroupItem: FC<ApiGroupItemProps> = ({ api, onClickGroup }) => {
  const [selectedApiGroup, setSelectedApiGroup] = useRecoilState(
    selectedApiGroupState
  );

  const initDelay = useCallback(
    (index) => (index < 5 ? 0.3 * index || 0.15 : 1.5),
    []
  );

  // const handleDragEnd = (fromIndex, toIndex) => {
  //   const temp = Object.assign(api.list).slice();
  //   const item = temp.splice(fromIndex, 1)[0];
  //   temp.splice(toIndex, 0, item);
  //   setProjectApiList({ ...projectApiList, api: [...temp] });
  // };

  return (
    <ol>
      {api.map((item: IApi, index: number) => (
        <React.Fragment key={item._id}>
          <motion.li
            role="listitem"
            className="flex items-center justify-between w-full bg-white cursor-pointer shadow rounded-lg p-4 relative mb-2 pl-5 pr-5"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            data-id={item._id}
            transition={{ duration: initDelay(index) }}
            onClick={() => onClickGroup(item)}
          >
            <div className="flex flex-row gap-5">
              <a href="#">
                <IconSort />
              </a>
              <p className="leading-6 text-xl">{item.title}</p>
              <p className="text-base leading-6 text-gray-500">
                {item.description}
              </p>
            </div>
            <div
              className={clsx(
                "flex flex-row transition-transform",
                selectedApiGroup?.groupList.includes(item._id) && " rotate-180"
              )}
            >
              <button>
                <IconArrowDown />
              </button>
            </div>
          </motion.li>
          <ReactDragListView
            // onDragEnd={handleDragEnd}
            nodeSelector="li"
            handleSelector="a"
          >
            <GroupItemList item={item} />
          </ReactDragListView>
        </React.Fragment>
      ))}
    </ol>
  );
};

export default ApiGroupItem;