import React, { FC, useCallback, useState, useRef, useEffect } from "react";
import { usePostProject } from "actions/project";
import { isEmpty } from "lib/helper";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Layout from "components/Core/Layout";
import IconClear from "/assets/clear.svg";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { userState } from "states/user";
import IUser from "interface/user";
import { Item } from "framer-motion/types/components/Reorder/Item";
import RoleMenu from "./RoleMenu";
import { projectState } from "states/project";

interface NewProps {}

type PramasProps = {
  name?: string;
  admin?: string;
  title: string;
  description: string;
  baseUrl: string;
  webUrl: string;
  member: { email: string; role: string }[];
};

const Index: FC<NewProps> = ({}) => {
  const router = useRouter();
  const inputRef = useRef<any>([]);

  const [user, setUser] = useRecoilState<IUser>(userState);
  const [postProject, { loading, data, error }]: any = usePostProject(true);

  const [newMember, setNewMember] = useState<{ email: string; role: string }>({
    email: "",
    role: "",
  });
  const [params, setParams] = useState<PramasProps>({
    title: "",
    description: "",
    baseUrl: "",
    webUrl: "",
    member: [{ email: "", role: "" }],
  });

  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  useEffect(() => {
    user &&
      setParams({
        ...params,
        member: [
          {
            email: user?.email,
            role: "owner",
          },
        ],
      });
  }, [user]);

  const handleMemberChange = (e) => {
    setNewMember({ ...newMember, [e.target.id]: e.target.value });
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
    if (isEmpty(newMember.email)) {
      inputRef.current[4].focus();
      return toast.error("Enter a new Member");
    }
    if (!regEmail.test(newMember.email)) {
      inputRef.current[4].focus();
      return toast.error("Invalid Email");
    }
    const hasEmail = params.member.some(
      (item) => item.email === newMember.email
    );

    if (hasEmail) {
      inputRef.current[4].select();
      inputRef.current[4].focus();
      return toast.error("Member already exists");
    }

    setParams({
      ...params,
      member: [...params.member, { ...newMember }],
    });
    setNewMember({ email: "", role: "" });
  };

  const handleClickRemoveMember = (email: string) => {
    setParams({
      ...params,
      member: [
        ...params.member.filter(
          (item: { email: string; role: string }) => item.email !== email
        ),
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.id === "add-member") return;
    const { title, description, baseUrl, webUrl } = params;
    const [titleRef, descRef, webUrlRef, baseUrlRef] = inputRef.current;

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

    const { status, data } = await postProject(params);
    if (data) {
      setUser(data);
      router.push("/project");
    }
  };

  return (
    <Layout title="New Project" loading={loading}>
      <div className="flex flex-col w-full border rounded">
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <div className="flex flex-row gap-2 mb-6">
              <input
                ref={(el) => (inputRef.current[4] = el)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={newMember.email}
                placeholder="member@domain"
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    handleClickAddMember();
                  }
                }}
                onChange={handleMemberChange}
              />
              <button
                id="add-member"
                type="button"
                className="flex items-center justify-center w-[38px] shadow appearance-none border rounded"
                onClick={handleClickAddMember}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                    fill="#e5e7eb"
                  />
                </svg>
              </button>
            </div>

            <span>
              {params.member.map((item: { email: string; role: string }) => (
                <div key={item.email} className="flex flex-row gap-2 mt-2">
                  {item.email !== user.email && (
                    <RoleMenu onChange={handleMemberChange} />
                  )}
                  <p className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                    {item.email}
                  </p>

                  {item.email !== user.email && (
                    <button
                      type="button"
                      className="flex items-center justify-center w-[38px] shadow appearance-none border rounded"
                      onClick={() => handleClickRemoveMember(item.email)}
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
                  )}
                </div>
              ))}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              aria-label="submit"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
