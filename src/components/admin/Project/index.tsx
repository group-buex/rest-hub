import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ProjectList from "./List";
import { useRecoilValue } from "recoil";
import IUser from "interface/user";
import { userState } from "states/user";
import ProjectNoneContents from "components/NoneContents/Project";
import Layout from "components/Core/Layout";

interface ProjectListProps {}

const Index: FC<ProjectListProps> = ({}) => {
  const router = useRouter();

  const user = useRecoilValue<IUser>(userState);

  const handleClickItem = async (id: string) => {
    router.push(`/${user._id}/${id}`);
  };

  return (
    <Layout>
      <div className="flex flex-row w-full justify-between mb-12">
        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
        <Link href={`/project/new`}>
          <a className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            New Rest Hub
          </a>
        </Link>
      </div>

      {!user?._id ? (
        <span>Loading...</span>
      ) : user.project.length === 0 ? (
        <ProjectNoneContents />
      ) : (
        <ProjectList list={user.project} onClickItem={handleClickItem} />
      )}
    </Layout>
  );
};

export default Index;
