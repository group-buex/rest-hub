import React, { FC } from "react";
import { useRouter } from "next/router";

import ProjectList from "./ProjectList";
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
