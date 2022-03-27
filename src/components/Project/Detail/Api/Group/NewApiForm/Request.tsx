import React, { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";
import { TempApiItemType } from "typings/project";
import IconAdd from "/assets/add.svg";
import IconClear from "/assets/clear.svg";
import Input from "components/Core/Controls/Input";
import Button from "components/Core/Controls/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tempApiRequestState, tempApiState } from "states/project";

interface RequestProps {
  tempApi: TempApiItemType;
  setTempApi: Dispatch<SetStateAction<any>>;
  border: string;
}

interface ReqeustForm {
  tempApiRequest: any;
  onChange: (e: any, seq: string) => void;
  onClickRemoveApi: (seq: string) => void;
}

const TypeMenu: FC<{ onChange: ChangeEventHandler<HTMLSelectElement> }> = ({
  onChange,
}) => {
  return (
    <select
      id="type"
      className="w-24 rounded bg-transparent border leading-tight py-2"
      onChange={onChange}
    >
      <option value="string" defaultChecked>
        string
      </option>
      <option value="number">number</option>
      <option value="object">object</option>
      <option value="boolean">boolean</option>
      <option value="array">array</option>
    </select>
  );
};

const RequestForm: FC<ReqeustForm> = ({
  tempApiRequest,
  onChange,
  onClickRemoveApi,
}) => {
  return (
    <>
      {Object.keys(tempApiRequest).map((index) => {
        const { name, isRequired, description, defaultValue } =
          tempApiRequest[index];
        return (
          <div key={index} className="flex flex-row w-full gap-3">
            <div className="w-12 text-md font-light py-2 whitespace-nowrap">
              <input
                type="checkbox"
                id="isRequired"
                value={isRequired}
                onChange={(e) => onChange(e, index)}
              />
            </div>
            <div className="md:w-44 w-24 text-md font-light py-2 whitespace-nowrap">
              <Input
                id="name"
                value={name}
                placeholder="Name"
                onChange={(e) => onChange(e, index)}
              />
              {/* <span className="text-sm text-red-500">* required</span> */}
            </div>
            <div className="w-24 text-md font-light py-2 whitespace-nowrap">
              <TypeMenu onChange={(e) => onChange(e, index)} />
            </div>
            <div className="md:w-48 w-24 text-md font-light py-2 whitespace-nowrap">
              <Input
                id="defaultValue"
                value={defaultValue}
                placeholder="DefaultValue"
                onChange={(e) => onChange(e, index)}
              />
            </div>
            <div className="flex-1 text-md font-light py-2 whitespace-nowrap">
              <Input
                id="description"
                value={description}
                placeholder="Description"
                onChange={(e) => onChange(e, index)}
              />
            </div>
            <div className="flex items-center">
              <Button
                transparent={true}
                hoverScale={1.4}
                onClick={() => onClickRemoveApi(index)}
              >
                <IconClear />
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
};

const Request: FC<RequestProps> = ({ border }) => {
  const [tempApiRequest, setTempApiRequest] =
    useRecoilState(tempApiRequestState);

  const handleChangeApiRequstInput = (
    { target: { id, value, checked } },
    seq: string
  ) => {
    setTempApiRequest({
      ...tempApiRequest,
      [seq]: {
        ...tempApiRequest[seq],
        [id]: id === "isRequired" ? checked : value,
      },
    });
  };

  const handleClickAddRequest = () => {
    const keyName = Number(Object.keys(tempApiRequest).length);

    setTempApiRequest({
      ...tempApiRequest,
      [keyName]: {
        seq: keyName,
        order: keyName,
        isRequired: false,
        name: "",
        type: "string",
        defaultValue: "",
        description: "",
      },
    });
  };

  const handleClickRemoveApi = (index: string) => {
    const newApi: any = [];
    // const removedApi = Object.keys(tempApiRequest).filter((i: string) => {
    //   console.log(tempApiRequest[i]);
    //   if (index !== i) return tempApiRequest[i];
    // });

    // console.log(tempApiRequest);

    // console.log(removedApi);

    // Object.keys(tempApiRequest).map((i: string) => {
    //   const {isRequired, name, type, defaultValue, description} = tempApiRequest[i];
    //   if (Number(i) > Number(index)) {
    //     newApi.push({
    //       seq: Number(i),
    //       order: Number(i),
    //       isRequired,
    //       name,
    //       type,
    //       defaultValue,
    //       description,
    //     });
    //   }
    // });

    // Object.keys(removedApi).map((i) => {
    //   if (Number(i) > Number(index)) {
    //     newApi.push({
    //       seq: Number(i),
    //       order: Number(i),
    //       isRequired: removedApi[i].isRequired,
    //       name: "",
    //       type: "string",
    //       defaultValue: "",
    //       description: "",
    //     });
    //   } else {
    //   }
    // });

    // const newApi = Object.keys(removedApi).map((i: string) => {
    //   if (Number(i) > Number(index)) {
    //     // removedApi[i].seq = Number(removedApi[i].seq) - 1;
    //     // removedApi[i].order = Number(removedApi[i].order) - 1;
    //     return removedApi[i];
    //   } else {
    //     return removedApi[i];
    //   }
    // });

    // console.log(newApi);
    // setTempApiRequest
  };

  return (
    <div className={`flex flex-col border-b ${border}`}>
      <div className="overflow-x-auto lg:-mx-8">
        <div className="py-2 inline-block min-w-full lg:px-8">
          <div className="overflow-hidden">
            <p className="flex flex-row justify-between text-md font-semibold py-2">
              Requset
              <Button
                transparent={true}
                hoverScale={1.4}
                onClick={handleClickAddRequest}
              >
                <IconAdd />
              </Button>
            </p>

            <section className="flex flex-col w-full">
              <div className="flex flex-row w-full gap-3">
                <div className="w-12 text-xs text-gray-300 py-2 text-left">
                  Required
                </div>
                <div className="md:w-44 w-24 text-xs text-gray-300 py-2 text-left">
                  Name
                </div>
                <div className="w-24 text-xs text-gray-300 py-2 text-left">
                  Type
                </div>
                <div className="md:w-48 w-24 text-xs text-gray-300 py-2 text-left">
                  Default Value
                </div>
                <div className="text-xs text-gray-300 py-2 text-left">
                  Description
                </div>
              </div>

              <RequestForm
                tempApiRequest={tempApiRequest}
                onChange={handleChangeApiRequstInput}
                onClickRemoveApi={handleClickRemoveApi}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
