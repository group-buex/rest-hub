import React, { FC } from "react";
import { IApiList } from "interface/api";
import Request from "./Request";
import Response from "./Response";
import Mock from "./Mock";

interface GroupListItemProps {
  item: IApiList;
}

const METHOD_COLOR_BORDER = {
  GET: "border-green-300",
  POST: "border-blue-300",
  PUT: "border-yellow-300",
  PATCH: "border-orange-300",
  DELETE: "border-red-300",
};

const Index: FC<GroupListItemProps> = ({ item }) => {
  return (
    <div
      className={`px-6 mb-8 rounded-md ${
        METHOD_COLOR_BORDER[item.method.toUpperCase()]
      } border-2 `}
    >
      {item.notice && (
        <div className="flex flex-col py-4 border-b-[1px]">
          <p className="text-xs text-gray-300 text-left">comment</p>
          <p>{item.notice}</p>
        </div>
      )}

      <Request item={item.request} />
      <Response item={item.response} />
      {item.mockData && <Mock item={item.mockData} />}
    </div>
  );
};

export default Index;
