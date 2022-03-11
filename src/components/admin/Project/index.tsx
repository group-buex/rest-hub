import React, { FC } from "react";
import { useRecoilValueLoadable } from "recoil";
import List from "./List";
import { getProjectSelector } from "states/project";
import { IProject } from "interface/project";

interface ProjectListProps {
  admin: string;
}

const ProjectList: FC<ProjectListProps> = ({ admin }) => {
  const { contents: projectList, state } = useRecoilValueLoadable<IProject[]>(
    getProjectSelector(admin)
  );

  return (
    <div className="flex flex-col md:w-6/12 w-10/12 items-center pt-32 pb-24 m-auto">
      <div className="flex flex-row w-full justify-between mb-12">
        <h1 className="text-5xl font-bold text-blue-500">Rest Hub</h1>
      </div>
      <div className="flex flex-row w-full justify-between mb-12">
        <h1 className="text-4xl font-bold text-gray-800">{admin}</h1>
        <button
          type="button"
          className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          New Project
        </button>
      </div>

      {state !== "hasValue" ? (
        <span>Loading...</span>
      ) : (
        projectList && <List list={projectList} />
      )}
    </div>
  );
};

export default ProjectList;
