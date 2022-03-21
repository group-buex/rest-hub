import React, { FC, useCallback, useState, useRef } from "react";
import { usePostProject } from "actions/project";
import { isEmpty } from "lib/helper";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Layout from "components/Core/Layout";

import IconAdd from "/assets/add.svg";
import IconClear from "/assets/clear.svg";
import { useRecoilValue } from "recoil";
import { userState } from "states/user";

interface NewProps {}

type PramasProps = {
  name?: string;
  admin?: string;
  title: string;
  description: string;
  baseUrl: string;
  webUrl: string;
  members: string[];
};

const Index: FC<NewProps> = ({}) => {
  const router = useRouter();
  const inputRef = useRef<any>([]);

  const user = useRecoilValue(userState);
  const [postProject, { loading, data, error }]: any = usePostProject(true);

  const [memberEmail, setMemberEmail] = useState<string>("");
  const [params, setParams] = useState<PramasProps>({
    title: null,
    description: null,
    baseUrl: null,
    webUrl: null,
    members: [],
  });

  const handleMemberEmailChange = (e) => {
    setMemberEmail(e.target.value);
  };

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

  const handleClickAddMember = () => {
    if (isEmpty(memberEmail)) {
      inputRef.current[4].focus();
      return toast.error("Enter a new Member");
    }
    if (params.members.includes(memberEmail)) {
      inputRef.current[4].select();
      inputRef.current[4].focus();
      return toast.error("Member already exists");
    }
    // TODO: Validation
    setMemberEmail("");
    setParams({ ...params, members: [...params.members, memberEmail] });
  };

  const handleClickRemoveMember = (member: string) => {
    setParams({
      ...params,
      members: [...params.members.filter((item: string) => item !== member)],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, baseUrl, webUrl } = params;
    const [titleRef, descRef, baseUrlRef, webUrlRef] = inputRef.current;

    if (isEmpty(title)) {
      titleRef.focus();
      return toast.error("Title is empty");
    }
    if (isEmpty(description)) {
      descRef.focus();
      return toast.error("Description is empty");
    }
    if (isEmpty(baseUrl)) {
      baseUrlRef.focus();
      return toast.error("Base Url is empty");
    }
    if (isEmpty(webUrl)) {
      webUrlRef.focus();
      return toast.error("Web Url is empty");
    }

    params.name = title;

    const { status, data } = await postProject(params);
    if (data) {
      router.push("/project");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full border rounded">
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              ref={(el) => (inputRef.current[0] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="title"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              ref={(el) => (inputRef.current[1] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="description"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="webUrl">
              Web Url
            </label>
            <input
              ref={(el) => (inputRef.current[2] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="webUrl"
              type="text"
              placeholder="your domain"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="baseUrl">
              Base Url
            </label>
            <input
              ref={(el) => (inputRef.current[3] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="baseUrl"
              type="text"
              placeholder="ex: /api/v1/"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="member">
              Member
            </label>
            <div className="flex flex-row gap-2">
              <input
                ref={(el) => (inputRef.current[4] = el)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="member"
                type="text"
                value={memberEmail}
                placeholder="member@domain"
                autoComplete="member"
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    handleClickAddMember();
                  }
                }}
                onChange={handleMemberEmailChange}
              />
              <button
                type="button"
                className="flex items-center justify-center w-[38px] shadow appearance-none border rounded"
                onClick={handleClickAddMember}
              >
                <IconAdd />
              </button>
            </div>

            <span>
              <div className="flex flex-row gap-2 mt-2">
                <p className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                  {user.email}
                </p>
              </div>
              {params.members.map((item) => (
                <div key={item} className="flex flex-row gap-2 mt-2">
                  <p className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                    {item}
                  </p>
                  <button
                    type="button"
                    className="flex items-center justify-center w-[38px] shadow appearance-none border rounded"
                    onClick={() => handleClickRemoveMember(item)}
                  >
                    <IconClear className="" />
                  </button>
                </div>
              ))}
            </span>
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
    </Layout>
  );
};

export default Index;
