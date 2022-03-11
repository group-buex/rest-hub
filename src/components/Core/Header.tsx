import React, { FC } from "react";

const Header: FC = () => {
  return (
    <nav className="flex justify-center w-full pt-3 pb-3 fixed z-10 bg-white top-0 backdrop-blur-2xl shadow">
      <div className="flex justify-between md:w-6/12 w-11/12">
        <div className="">
          <h1 className="text-4xl font-bold text-blue-500">Rest Hub</h1>
        </div>
        <button
          type="button"
          className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          New Project
        </button>
      </div>
    </nav>
  );
};
// <div className="flex flex-row w-full justify-between mb-8 p">
//   <h1 className="text-4xl font-bold text-blue-500">Rest Hub</h1>
//   <button
//     type="button"
//     className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//   >
//     New Project
//   </button>
// </div>

export default Header;
