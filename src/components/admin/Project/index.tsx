import React, { FC } from "react";
import { useRouter } from "next/router";

import ProjectList from "./List";
import { IProject } from "interface/project";
import { getProjectListSelector } from "states/project";
import useGetRecoilState from "hooks/useGetRecoilState";

interface ProjectListProps {
  admin: string;
}

const Index: FC<ProjectListProps> = ({ admin }) => {
  const router = useRouter();
  const { contents, state } = useGetRecoilState<IProject[]>(
    getProjectListSelector(admin)
  );

  const handleClickItem = async (id: string) => {
    router.push(`/${admin}/${id}`);
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between mb-12">
        <h1 className="text-3xl font-bold text-gray-800">By {admin}</h1>
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
        contents && (
          <ProjectList list={contents} onClickItem={handleClickItem} />
        )
      )}
    </>
  );
};

export default Index;
