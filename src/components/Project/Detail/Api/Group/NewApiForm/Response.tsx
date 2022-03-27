import React, { FC } from "react";
import { TempApiItemType } from "typings/project";
import IconAdd from "/assets/add.svg";

interface ResponseProps {
  tempApi: TempApiItemType;
  border: string;
}

const Response: FC<ResponseProps> = ({ tempApi, border }) => {
  return (
    <div className={`api-response w-full border-b ${border}`}>
      <p className="flex flex-row justify-between pr-4 py-3 rounded">
        Reponse
        <span>
          <IconAdd />
        </span>
      </p>
    </div>
  );
};

export default Response;
