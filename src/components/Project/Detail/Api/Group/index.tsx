import React, { FC, useCallback } from "react";
import { useRecoilState } from "recoil";
import { projectState, selectedApiGroupState } from "states/project";

import ReactDragListView from "components/ReactDragListView";
import GorupItem from "./Item";
import { IApi } from "interface/api";

const Index: FC = () => {
  const [project, setProject] = useRecoilState(projectState);
  const [selectedApiGroup, setSelectedApiGroup] = useRecoilState(
    selectedApiGroupState
  );
  const { api } = project;

  const handleDragEnd = (fromIndex, toIndex) => {
    const temp = Object.assign(api).slice();
    const item = temp.splice(fromIndex, 1)[0];
    temp.splice(toIndex, 0, item);
    setProject({ ...project, api: [...temp] });
  };

  const handleClickGroup = (item: IApi) => {
    if (
      selectedApiGroup.groupList.length > 0 &&
      selectedApiGroup.groupList.includes(item._id)
    ) {
      selectedApiGroup.groupList.filter((list) => list !== item._id);
      setSelectedApiGroup({
        ...selectedApiGroup,
        groupList: selectedApiGroup.groupList.filter(
          (list) => list !== item._id
        ),
      });
      return;
    }
    setSelectedApiGroup({
      ...selectedApiGroup,
      groupList: [...selectedApiGroup.groupList, item._id],
    });
  };

  return (
    <ReactDragListView
      onDragEnd={handleDragEnd}
      nodeSelector="li"
      handleSelector="a"
    >
      {api}
      <GorupItem api={api?.list} onClickGroup={handleClickGroup} />
    </ReactDragListView>
  );
};

export default Index;
