import useGetRecoilState from "hooks/useGetRecoilState";
import { IProjectApi } from "interface/project";
import React, { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import { getApiListByProjectIdSelector, projectApiState } from "states/project";
import DetailList from "./List";

interface DetailProps {
  admin: string;
  id: string;
}

const Index: FC<DetailProps> = ({ admin, id }) => {
  const [projectApiList, setProjectApiList] = useRecoilState(projectApiState);

  const { contents, state } = useGetRecoilState<IProjectApi>(
    getApiListByProjectIdSelector({ admin, id })
  );

  useEffect(() => {
    state === "hasValue" && setProjectApiList(contents);
  }, [state]);

  return (
    <div className="">
      {state !== "hasValue" ? (
        <span>Loading...</span>
      ) : (
        projectApiList && <DetailList {...projectApiList} />
      )}
    </div>
  );
};

export default Index;
