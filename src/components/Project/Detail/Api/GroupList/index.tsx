import React, { FC, useCallback, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { IApi, IApiList } from "interface/api";
import { useRecoilState } from "recoil";
import { selectedApiGroupState, tempApiState } from "states/project";
import { TempApiItemType } from "typings/project";
import NewApiForm from "../Group/NewApiForm";
import GroupListItem from "../GroupListItem";

import IconArrowDown from "/assets/keyboard_arrow_down.svg";

interface GourpItemListProps {
  item: IApi;
}

const METHOD_COLOR_BG = {
  GET: "bg-green-300",
  POST: "bg-blue-300",
  PUT: "bg-yellow-300",
  PATCH: "bg-orange-300",
  DELETE: "bg-red-300",
};

const GourpItemList: FC<GourpItemListProps> = ({ item }) => {
  const [{ groupList, apiList }, setSelectedApiGroup] = useRecoilState(
    selectedApiGroupState
  );

  const [tempApi, setTempApi] = useState<TempApiItemType>(initTempApiItem);

  const initDelay = useCallback(
    (index) => (index < 5 ? 0.3 * index || 0.15 : 1.5),
    []
  );

  const handleClickGroup = (item: IApiList) => {
    if (apiList.length > 0 && apiList.includes(item._id)) {
      apiList.filter((list) => list !== item._id);
      setSelectedApiGroup({
        groupList,
        apiList: apiList.filter((list) => list !== item._id),
      });
      return;
    }
    setSelectedApiGroup({
      groupList,
      apiList: [...apiList, item._id],
    });
  };

  const handleChangeTempApiStatus = (status: string, groupId: string) => {
    setTempApi({ ...tempApi, status, groupId });
  };

  const handleChangeTempApi = ({ target: { id, value } }) => {
    setTempApi({ ...tempApi, [id]: value });
  };

  return (
    <>
      <ol className="mb-8">
        {item.list?.map((api: IApiList, index: number) => (
          <React.Fragment key={api.seq}>
            <motion.li
              role="listitem"
              className="flex items-center justify-between w-full bg-white cursor-pointer shadow rounded-lg p-4 relative mb-2 pl-5 pr-5"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              data-id={api._id}
              transition={{ duration: initDelay(index) }}
              onClick={() => handleClickGroup(api)}
            >
              <span className="flex flex-row gap-5 ">
                <p
                  className={`flex justify-center w-24 leading-6 text-xl pt-1 pb-1 rounded-md ${
                    METHOD_COLOR_BG[api.method.toUpperCase()]
                  }`}
                >
                  {api.method}
                </p>
                <p className="flex items-center text-base leading-6 text-gray-700">
                  {api.url}
                </p>
              </span>
              <span className="flex flex-row gap-6">
                <p className="text-base leading-6 text-gray-500">
                  {api.description}
                </p>
                <span
                  className={clsx(
                    "flex flex-row transition-transform",
                    apiList?.includes(api._id) && " rotate-180"
                  )}
                >
                  <button aria-label="search">
                    <IconArrowDown />
                  </button>
                </span>
              </span>
            </motion.li>
            {apiList.includes(api._id) && <GroupListItem item={api} />}
          </React.Fragment>
        ))}
      </ol>
      {tempApi.status === "wait" ? (
        <button onClick={() => handleChangeTempApiStatus("ready", item._id)}>
          Add REST
        </button>
      ) : (
        <NewApiForm
          tempApi={tempApi}
          setTempApi={setTempApi}
          onChangeTempApi={handleChangeTempApi}
          onChangeTempApiStatus={handleChangeTempApiStatus}
        />
      )}
    </>
  );
};

const initTempApiItem = {
  groupId: "",
  status: "wait",
  seq: 0,
  order: 0,
  method: "get",
  url: "",
  description: "",
  notice: "",
  mockData: {},
  request: [
    {
      seq: 0,
      order: 0,
      isRequired: false,
      name: "",
      type: "",
      defaultValue: "",
      description: "",
    },
  ],
  response: [
    {
      seq: 0,
      order: 0,
      code: 0,
      message: "",
      data: {},
    },
  ],
};

export default GourpItemList;
