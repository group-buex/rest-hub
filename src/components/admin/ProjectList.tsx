import React, { FC } from "react";

interface ProjectListProps {
  admin: string;
}

const ProjectList: FC<ProjectListProps> = ({ admin }) => {
  return (
    <div className="flex flex-col md:w-6/12 w-10/12 min-w-min h-screen items-center pt-32 m-auto">
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

      <div
        role="listitem"
        className="w-full bg-white cursor-pointer shadow rounded-lg p-8 relative"
      >
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-semibold leading-6 text-gray-800">
            Starter
          </h2>
          <p className="text-sm leading-6 text-gray-400">03/10/2022</p>
        </div>
        <p className="text-base leading-6 mt-4 text-gray-500">
          Full access to all features and no credit card required
        </p>
      </div>
    </div>
  );
};

export default ProjectList;
