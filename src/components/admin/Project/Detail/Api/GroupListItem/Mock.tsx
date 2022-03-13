import React, { FC } from "react";
import JSONPretty from "react-json-pretty";

interface MockProps {
  item: object;
}

const Mock: FC<MockProps> = ({ item }) => {
  return (
    <div className="mb-6 py-2">
      <p className="text-md font-semibold text-gray-900 py-2">Try it</p>
      <JSONPretty
        id="json-pretty"
        className="rounded-sm"
        style={{ fontSize: "0.8em" }}
        data={item}
      />
    </div>
  );
};

export default Mock;
