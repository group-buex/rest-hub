import React, { FC, useCallback, useState } from "react";
import { motion } from "framer-motion";

import GroupList from "../GroupList";

import { IApi } from "interface/api";
import IconArrowDown from "/assets/keyboard_arrow_down.svg";
import IconSort from "/assets/sort.svg";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { selectedApiGroupState } from "states/project";
import ReactDragListView from "components/ReactDragListView";
import NewApiForm from "./NewApiForm";
import { TempApiItemType } from "typings/project";

interface ApiGroupItemProps {
  api: IApi[];
  onClickGroup: (item: IApi) => void;
}

const ApiGroupItem: FC<ApiGroupItemProps> = ({ api, onClickGroup }) => {
  const [{ groupList, apiList }, setSelectedApiGroup] = useRecoilState(
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
    <ol className="w-full">
      {api?.map((item: IApi, index: number) => (
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
            <span className="flex flex-row gap-5">
              <a href="#" aria-label="Sort">
                <IconSort />
              </a>
              <p className="leading-6 text-xl">{item.title}</p>
              <p className="text-base leading-6 text-gray-500">
                {item.description}
              </p>
            </span>
            <span
              className={clsx(
                "flex flex-row transition-transform",
                groupList?.includes(item._id) && " rotate-180"
              )}
            >
              <button aria-label="search">
                <IconArrowDown />
              </button>
            </span>
          </motion.li>

          {groupList.includes(item._id) && (
            <ReactDragListView
              // onDragEnd={handleDragEnd}
              nodeSelector="li"
              handleSelector="a"
            >
              <GroupList item={item} />
            </ReactDragListView>
          )}

          {/* {tempRest.status === "wait" ? (
              <button onClick={() => handleTempRestStatus("ready")}>
                Add REST
              </button>
            ) */}
        </React.Fragment>
      ))}
    </ol>
  );
};

export default ApiGroupItem;
