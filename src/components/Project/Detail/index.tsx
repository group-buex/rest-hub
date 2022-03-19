import Layout from "components/Core/Layout";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";
import React, { FC } from "react";
import { getProjectByIdSelector, projectState } from "states/project";
import DetailList from "./List";

interface DetailProps {
  id: string;
}

const Index: FC<DetailProps> = ({ id }) => {
  const { state, stateData } = useGetRecoilValueLoadable(
    getProjectByIdSelector(id),
    projectState
  );

  return (
    <Layout title={stateData?.title}>
      <div className="">
        {state !== "hasValue" ? (
          <span>Loading...</span>
        ) : (
          stateData && <DetailList {...stateData} />
        )}
      </div>
    </Layout>
  );
};

export default Index;
