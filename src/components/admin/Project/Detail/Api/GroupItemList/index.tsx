import { motion } from "framer-motion";
import { IApi } from "interface/api";
import React, { FC } from "react";
import { useRecoilState } from "recoil";
import { projectApiState, selectedApiGroupState } from "states/project";

interface GourpItemListProps {
  item: IApi;
}

const GourpItemList: FC<GourpItemListProps> = ({ item }) => {
  const [projectApiList, setProjectApiList] = useRecoilState(projectApiState);
  const [{ groupList, apiList }, setSelectedApiGroup] = useRecoilState(
    selectedApiGroupState
  );

  if (!groupList.includes(item._id)) return null;
  return <motion.div>{item._id}</motion.div>;
};

export default GourpItemList;
