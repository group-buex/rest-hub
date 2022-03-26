import React, { FC, useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Core/Layout";
import Link from "next/link";
import { isEmpty } from "lib/helper";
import { usePostUser } from "actions/user";
import toast from "react-hot-toast";

const Signup: FC = () => {
  const router = useRouter();
  const inputRef = useRef<any>([]);

  const [postUser, { loading, data, error }]: any = usePostUser(true);

  const [params, setParams] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (loading) return null;

    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    const { name, email, password, confirmPassword } = params;
    const [nameRef, emailRef, passwordRef, confirmPasswordRef] =
      inputRef.current;

    if (isEmpty(name?.trim())) {
      nameRef.focus();
      return toast.error("Name is required");
    }

    if (isEmpty(email?.trim())) {
      emailRef.focus();
      return toast.error("Email is required");
    } else if (!regEmail.test(email?.trim())) {
      emailRef.focus();
      return toast.error("Invalid email");
    }

    if (isEmpty(password?.trim())) {
      passwordRef.focus();
      return toast.error("Password is required");
    } else if (
      !(password?.length >= 6 && password?.length <= 20) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      passwordRef.focus();
      return toast.error(
        "Invalid Password. 6 ~ 20 characters, Contain characters and numbers"
      );
    } else if (password !== confirmPassword) {
      confirmPasswordRef.focus();
      return toast.error("Passwords do not match");
    }

    if (isEmpty(confirmPassword?.trim())) {
      confirmPasswordRef.focus();
      return toast.error("Confirm Password is required");
    }

    const { state, data } = await postUser(params);
    if (data) {
      toast.success("Sign up in Success");
      router.push(`/auth/login`);
    }
  };

  return (
    <Layout title="Sign In">
      <div className="fade w-full max-w-xs">
        <form
          className="shadow-md rounded px-8 pt-6 pb-8 mb-4 border"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              ref={(el) => (inputRef.current[0] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="name"
              maxLength={32}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              ref={(el) => (inputRef.current[1] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email@domain"
              maxLength={128}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              ref={(el) => (inputRef.current[2] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="****************"
              autoComplete="password"
              maxLength={36}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              ref={(el) => (inputRef.current[3] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="****************"
              autoComplete="confirmPassword"
              maxLength={36}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              aria-label="submit"
            >
              Sign up
            </button>
            <Link href="/auth/login">
              <a className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500">
                Login
              </a>
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Group Buex. All rights reserved.
        </p>
      </div>
    </Layout>
  );
};

export default Signup;
