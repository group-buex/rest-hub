import useGetRecoilState from "hooks/useGetRecoilState";
import { IProjectApi } from "interface/project";
import React, { FC } from "react";
import { getApiListByProjectIdSelector } from "states/project";

interface DetailProps {
  admin: string;
  id: string;
}

const Index: FC<DetailProps> = ({ admin, id }) => {
  const { contents, state } = useGetRecoilState<IProjectApi[]>(
    getApiListByProjectIdSelector({ admin, id })
  );

  return <div>Index</div>;
};

export default Index;
