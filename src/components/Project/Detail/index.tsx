import { usePostProjectApi } from "actions/project";
import Button from "components/Core/Controls/Button";
import Layout from "components/Core/Layout";
import { motion } from "framer-motion";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";
import { IProject } from "interface/project";
import { isEmpty } from "lib/helper";
import Link from "next/link";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { getProjectByIdSelector, projectState } from "states/project";
import ApiGroup from "./Api/Group";

interface DetailProps {
  id: string;
}

const DetailHeader: FC<IProject> = ({
  title,
  description,
  baseUrl,
  webUrl,
}) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-between w-full  mb-12">
        <h1 className="text-3xl font-bold mb-3 tracking-wide">{title}</h1>
        <p className="text-sm leading-6 md:mt-2 mt-1 text-gray-400 tracking-wide">
          {description}
        </p>
        <p className="text-sm leading-6 mt-1 text-gray-400 tracking-widestst">
          Base : [ {baseUrl} ]
        </p>
        <Link href={webUrl}>
          <a className="text-sm leading-6 mt-1 text-gray-400 tracking-wide">
            {webUrl}
          </a>
        </Link>
      </div>
    </div>
  );
};

const Index: FC<DetailProps> = ({ id }) => {
  const { state, stateData, setStateData } = useGetRecoilValueLoadable(
    getProjectByIdSelector(id),
    projectState
  );

  const [postProjectApi, { loading, error, data }]: any = usePostProjectApi(
    true,
    200
  );

  const [tempRest, setTempRest] = useState({
    status: "wait",
    projectId: id,
    title: "",
    description: "",
  });

  const handleChangeTempRest = (name: string, value: string) => {
    setTempRest({ ...tempRest, [name]: value });
  };

  const handleTempRestStatus = (status: "wait" | "ready") => {
    setTempRest({ ...tempRest, status, title: "", description: "" });
  };

  const handleSubmitCreateApi = async (e) => {
    e.preventDefault();

    if (isEmpty(tempRest.title)) {
      return toast.error("Enter a title");
    }
    if (isEmpty(tempRest.description)) {
      return toast.error("Enter a description");
    }
    const { status, data } = await postProjectApi(tempRest);

    if (data) {
      toast.success("Success");
      setStateData(data);
      setTempRest({
        status: "wait",
        projectId: id,
        title: "",
        description: "",
      });
    }
  };

  return (
    <Layout title={stateData?.title} loading={state === "loading"}>
      {state !== "hasValue" ? (
        <span>Loading...</span>
      ) : (
        stateData && (
          <>
            <DetailHeader {...stateData} />
            <ApiGroup />

            {tempRest.status === "wait" ? (
              <button onClick={() => handleTempRestStatus("ready")}>
                Add REST
              </button>
            ) : (
              <motion.li
                role="listitem"
                className="flex items-center justify-between w-full border cursor-pointer shadow rounded-lg p-4 relative mb-2 pl-5 pr-5"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                // onClick={() => onClickGroup(item)}
              >
                <span className="flex md:flex-row flex-col gap-5 w-full">
                  <div className="md:block flex md:mb-2 mr-4">
                    <label
                      className="block text-sm font-bold mb-2 w-[130px]"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="title"
                      onChange={(e) =>
                        handleChangeTempRest("title", e.target.value)
                      }
                    />
                  </div>
                  <div className="md:block flex md:mb-2  mr-4 md:w-[50vw]">
                    <label
                      className="block text-sm font-bold mb-2 w-[130px]"
                      htmlFor="title"
                    >
                      Description
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      type="text"
                      placeholder="description"
                      onChange={(e) =>
                        handleChangeTempRest("description", e.target.value)
                      }
                    />
                  </div>

                  <span className="flex flex-col">
                    <Button
                      className="md:mt-[26px] md:mr-0 mr-4"
                      onClick={handleSubmitCreateApi}
                    >
                      Submit
                    </Button>
                  </span>
                </span>

                <button
                  className="self-start"
                  aria-label="clear"
                  onClick={() => handleTempRestStatus("wait")}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="#e5e7eb"
                    />
                  </svg>
                </button>
              </motion.li>
            )}
          </>
        )
      )}
    </Layout>
  );
};

export default Index;
