import React, { FC } from "react";
import { IProject } from "interface/project";
import Link from "next/link";

const DetailList: FC<IProject> = (props) => {
  const { title, description, baseUrl, webUrl } = props;
  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-between w-full  mb-12">
        <h1 className="text-3xl font-bold mb-3 tracking-wide">{title}</h1>
        <p className="text-sm leading-6 md:mt-2 mt-1 text-gray-400 tracking-wide">
          {description}
        </p>
        <p className="text-sm leading-6 mt-1 text-gray-400 tracking-widestst">
          Base : [ {baseUrl} ]
        </p>
        <Link href={webUrl}>
          <a className="text-sm leading-6 mt-1 text-gray-400 tracking-wide">
            {webUrl}
          </a>
        </Link>
      </div>

      {/* <ApiGroup /> */}
    </div>
  );
};

export default DetailList;
