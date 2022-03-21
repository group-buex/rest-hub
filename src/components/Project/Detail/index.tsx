import Layout from "components/Core/Layout";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";
import { IProject } from "interface/project";
import Link from "next/link";
import React, { FC } from "react";
import { getProjectByIdSelector, projectState } from "states/project";

interface DetailProps {
  id: string;
}

const DetailHeader: FC<IProject> = ({
  title,
  description,
  baseUrl,
  webUrl,
}) => {
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
    </div>
  );
};

const Index: FC<DetailProps> = ({ id }) => {
  const { state, stateData } = useGetRecoilValueLoadable(
    getProjectByIdSelector(id),
    projectState
  );

  return (
    <Layout title={stateData?.title}>
      {state !== "hasValue" ? (
        <span>Loading...</span>
      ) : (
        stateData && <DetailHeader {...stateData} />
      )}
      {/* <ApiGroup /> */}
    </Layout>
  );
};

export default Index;
