import React, { FC } from "react";
import { IApiRequest } from "interface/api";

interface RequestProps {
  item: IApiRequest[];
}

const Request: FC<RequestProps> = ({ item }) => {
  return (
    <div className="flex flex-col border-b-[1px]">
      <div className="overflow-x-auto lg:-mx-8">
        <div className="py-2 inline-block min-w-full lg:px-8">
          <div className="overflow-hidden">
            <p className="text-md font-semibold text-gray-900 py-2">Requset</p>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="md:w-56 w-32 text-xs text-gray-300 py-2 text-left"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="w-1 text-xs text-gray-300 py-2 text-left"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-xs text-gray-300 px-6 py-2 text-left"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.map((request: IApiRequest) => (
                  <tr key={request._id}>
                    <td className="text-xl text-gray-900 font-light py-2 whitespace-nowrap">
                      {request.name}
                      {/* <span className="text-sm text-red-500">* required</span> */}
                    </td>
                    <td className="text-md text-gray-900 font-light py-2 whitespace-nowrap">
                      {request.type}
                    </td>
                    <td className="text-md text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                      {request.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
