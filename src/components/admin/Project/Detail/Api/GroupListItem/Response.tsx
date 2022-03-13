import React, { FC } from "react";
import { IApiResponse } from "interface/api";

interface ResponseProps {
  item: IApiResponse[];
}

const Response: FC<ResponseProps> = ({ item }) => {
  return (
    <div className="flex flex-col border-b-[1px]">
      <div className="overflow-x-auto lg:-mx-8">
        <div className="py-2 inline-block min-w-full lg:px-8">
          <div className="overflow-hidden">
            <p className="text-md font-semibold text-gray-900 py-2">Response</p>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-1 text-xs text-gray-300 py-2 text-left"
                  >
                    Code
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
                {item.map((response: IApiResponse) => (
                  <tr key={response._id}>
                    <td className="text-xl text-gray-900 font-light py-2 whitespace-nowrap">
                      {response.code}
                    </td>
                    <td className="text-md text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                      {response.message}
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

export default Response;
