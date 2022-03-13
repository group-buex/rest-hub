import React, { FC, useCallback, useState, useRef } from "react";
import { usePostProject } from "actions/project";
import { isEmpty } from "lib/helper";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface NewProps {
  admin: string;
}

type PramasProps = {
  name?: string;
  admin?: string;
  title: string;
  description: string;
  baseUrl: string;
  webUrl: string;
};

const Index: FC<NewProps> = ({ admin }) => {
  const router = useRouter();
  const inputRef = useRef<any>([]);
  const [postProject, { loading, data, error }]: any = usePostProject(true);

  const [params, setParams] = useState<PramasProps>({
    title: null,
    description: null,
    baseUrl: null,
    webUrl: null,
  });

  const handleInputChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setParams({
        ...params,
        [id]: value,
      });
    },
    [params]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, baseUrl, webUrl } = params;
    const [titleRef, descRef, baseUrlRef, webUrlRef] = inputRef.current;

    if (isEmpty(title)) {
      titleRef.focus();
      return toast.error("Title field is empty");
    }
    if (isEmpty(description)) {
      descRef.focus();
      return toast.error("Description field is empty");
    }
    if (isEmpty(baseUrl)) {
      baseUrlRef.focus();
      return toast.error("Base Url field is empty");
    }
    if (isEmpty(webUrl)) {
      webUrlRef.focus();
      return toast.error("Web Url field is empty");
    }

    params.name = title;
    params.admin = admin;

    const { status, data } = await postProject(params);
    if (data) {
      toast.success("Done.");
      const timeId = setTimeout(() => {
        window.location.pathname = `/${admin}`;
      }, 600);

      return () => clearTimeout(timeId);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            ref={(el) => (inputRef.current[0] = el)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            ref={(el) => (inputRef.current[1] = el)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Description"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="webUrl"
          >
            Web Url
          </label>
          <input
            ref={(el) => (inputRef.current[2] = el)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="webUrl"
            type="text"
            placeholder="https://www.rest-hub.com"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="baseUrl"
          >
            Base Url
          </label>
          <input
            ref={(el) => (inputRef.current[3] = el)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="baseUrl"
            type="text"
            placeholder="/api/v1/..."
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            aria-label="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Index;
