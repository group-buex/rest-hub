import React, { FC } from "react";
import { IProject, IProjectApi } from "interface/project";
import { IApi } from "interface/api";
import Api from "./Api";
import { selectedApiState } from "states/project";
import { useRecoilState } from "recoil";

interface ListProps {
  project: IProject;
  api: IApi[];
}

const List: FC<ListProps> = ({ project, api }) => {
  const [currentApi, setCurrentApi] = useRecoilState(selectedApiState);

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

      <Api list={api} onClickTitleItem={handleClickTitleItem} />
    </>
  );
};

export default List;
