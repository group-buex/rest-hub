import useGetRecoilState from "hooks/useGetRecoilState";
import { IProjectApi } from "interface/project";
import React, { FC } from "react";
import { getApiListByProjectIdSelector } from "states/project";
import List from "./List";

interface DetailProps {
  admin: string;
  id: string;
}

const Index: FC<DetailProps> = ({ admin, id }) => {
  const { contents, state } = useGetRecoilState<IProjectApi>(
    getApiListByProjectIdSelector({ admin, id })
  );

  return (
    <div className="">
      {state !== "hasValue" ? (
        <span>Loading...</span>
      ) : (
        contents && <List {...contents} />
      )}
    </div>
  );
};

export default Index;
