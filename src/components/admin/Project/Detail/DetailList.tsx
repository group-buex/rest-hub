import React, { FC } from "react";
import { IProject, IProjectApi } from "interface/project";
import { IApi } from "interface/api";
import Api from "./Api/ApiList";
import { useRecoilState } from "recoil";

interface DetailListProps {
  project: IProject;
  api: IApi[];
}

const DetailList: FC<DetailListProps> = ({ project, api }) => {
  const handleClickTitleItem = (id) => {
    // if (currentApi.length > 0 && currentApi.filter((api) => api.id === id)) {
    //   console.log(currentApi.filter((api) => api.id !== id));
    //   setCurrentApi(currentApi.filter((api) => api.id !== id));
    // } else {
    //   setCurrentApi([...currentApi, { id }]);
    // }
    // console.log(currentApi);
  };
  return (
    <>
      <div className="flex flex-col w-full justify-between mb-12">
        <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>
        <p className="text-base leading-6 mt-4 text-gray-500">
          {project.description}
        </p>
      </div>

      <Api onClickTitleItem={handleClickTitleItem} />
    </>
  );
};

export default DetailList;
