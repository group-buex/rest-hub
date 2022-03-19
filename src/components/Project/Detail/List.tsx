import React, { FC } from "react";
import ApiGroup from "./Api/Group";
import { IProject } from "interface/project";
import { IApi } from "interface/api";

const DetailList: FC<IProject> = (props) => {
  const { title, description } = props;
  return (
    <>
      <div className="flex flex-col w-full justify-between mb-12">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <p className="text-base leading-6 mt-4 text-gray-500">{description}</p>
      </div>
      {/* 
      <ApiGroup /> */}
    </>
  );
};

export default DetailList;
