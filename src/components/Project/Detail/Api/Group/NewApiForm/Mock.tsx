import React, { FC } from "react";
import { TempApiItemType } from "typings/project";
import IconAdd from "/assets/add.svg";

interface MockProps {
  tempApi: TempApiItemType;
  border: string;
}

const Mock: FC<MockProps> = ({ tempApi, border }) => {
  return (
    <div className={`api-mock w-full border-b ${border}`}>
      <p className="flex flex-row justify-between pr-4 py-3 rounded">
        Mock
        <span>
          <IconAdd />
        </span>
      </p>
    </div>
  );
};

export default Mock;
