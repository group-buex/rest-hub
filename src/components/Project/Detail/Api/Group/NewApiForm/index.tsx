import React, { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";
import Button from "components/Core/Controls/Button";
import Input from "components/Core/Controls/Input";
import { motion } from "framer-motion";
import { TempApiItemType } from "typings/project";
import Request from "./Request";
import Response from "./Response";
import Mock from "./Mock";
import { tempApiRequestState } from "states/project";
import { useRecoilValue } from "recoil";

import IconClear from "/assets/clear.svg";

interface NewApiFormProps {
  tempApi: TempApiItemType;
  setTempApi: Dispatch<SetStateAction<TempApiItemType>>;
  onChangeTempApi: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onChangeTempApiStatus: (status: string, groupId: string) => void;
}

const METHOD_COLOR_BORDER = {
  GET: "border-green-300",
  POST: "border-blue-300",
  PUT: "border-yellow-300",
  PATCH: "border-orange-300",
  DELETE: "border-red-300",
};
const METHOD_COLOR_SHADOW = {
  GET: "shadow-green-300",
  POST: "shadow-blue-300",
  PUT: "shadow-yellow-300",
  PATCH: "shadow-orange-300",
  DELETE: "shadow-red-300",
};

const MethodMenu: FC<{ onChange: ChangeEventHandler<HTMLSelectElement> }> = ({
  onChange,
}) => {
  return (
    <select
      id="method"
      className="rounded bg-transparent border leading-tight py-2"
      onChange={onChange}
    >
      <option value="get" defaultChecked>
        GET
      </option>
      <option value="post">POST</option>
      <option value="patch">PATCH</option>
      <option value="put">PUT</option>
      <option value="delete">DELETE</option>
    </select>
  );
};

const NewApiForm: FC<NewApiFormProps> = ({
  tempApi,
  setTempApi,
  onChangeTempApi,
  onChangeTempApiStatus,
}) => {
  const tempApiRequest = useRecoilValue(tempApiRequestState);

  const handleSubmit = async () => {
    console.log(tempApi);
    console.log(tempApiRequest);
  };

  return (
    <motion.li
      role="listitem"
      className={`flex items-center justify-between w-full border-2 ${
        METHOD_COLOR_SHADOW[tempApi.method.toUpperCase()]
      } ${
        METHOD_COLOR_BORDER[tempApi.method.toUpperCase()]
      } cursor-pointer shadow rounded-lg p-4 relative mb-4 pl-5 pr-5`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      // onClick={() => onClickGroup(item)}
    >
      <span className="flex flex-col w-full gap-2 mr-4">
        <div className="flex md:flex-row flex-row w-full gap-2">
          <div className="flex md:mb-2">
            <MethodMenu onChange={onChangeTempApi} />
          </div>
          <div className="flex md:mb-2">
            <Input
              id="url"
              value={tempApi.url}
              type="text"
              placeholder="Path"
              onChange={onChangeTempApi}
            />
          </div>
          <div className="flex md:mb-2 md:w-[50vw]">
            <Input
              id="description"
              value={tempApi.description}
              type="text"
              placeholder="Description"
              onChange={onChangeTempApi}
            />
          </div>

          <span className="flex flex-col">
            <Button className="" onClick={handleSubmit}>
              Submit
            </Button>
          </span>
        </div>

        <div className="flex notice">
          <div className="flex md:mb-2 w-full">
            <Input
              id="notice"
              value={tempApi.notice}
              type="text"
              placeholder="Notice"
              onChange={onChangeTempApi}
            />
          </div>
        </div>

        <Request
          tempApi={tempApi}
          setTempApi={setTempApi}
          border={METHOD_COLOR_BORDER[tempApi.method.toUpperCase()]}
        />
        <Response
          tempApi={tempApi}
          border={METHOD_COLOR_BORDER[tempApi.method.toUpperCase()]}
        />
        <Mock
          tempApi={tempApi}
          border={METHOD_COLOR_BORDER[tempApi.method.toUpperCase()]}
        />
      </span>

      <Button
        className="self-start"
        aria-label="clear"
        transparent={true}
        hoverScale={1.4}
        onClick={() => onChangeTempApiStatus("wait", tempApi.groupId)}
      >
        <IconClear />
      </Button>
    </motion.li>
  );
};

export default NewApiForm;
