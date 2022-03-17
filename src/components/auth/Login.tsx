import { FC, useCallback, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { isEmpty } from "lib/helper";
import { useLogin } from "actions/user";
import { useRecoilState } from "recoil";
import { userState } from "states/user";
import IUser from "interface/user";
import Layout from "components/Core/Layout";

const Login: FC = () => {
  const inputRef = useRef<any>([]);
  const [user, setUser] = useRecoilState<IUser>(userState);
  const [login, { loading, data, error }]: any = useLogin(true);

  const [params, setParams] = useState<{ email: string; password: string }>({
    email: null,
    password: null,
  });
  const router = useRouter();

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

    const { email, password } = params;
    const [emailRef, passwordRef] = inputRef.current;

    // TODO: email validation
    if (isEmpty(email.trim())) {
      emailRef.focus();
      return toast.error("Email is required");
    }
    if (isEmpty(password.trim())) {
      passwordRef.focus();
      return toast.error("Password is required");
    }

    const { status, data } = await login(params);
    if (data) {
      await setUser(data);
      router.push(`/project`);
    }
  };
  return (
    <Layout title="Login" loading={loading}>
      <div className="fade w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={(el) => (inputRef.current[0] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={(el) => (inputRef.current[1] = el)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="****************"
              autoComplete="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              aria-label="submit"
            >
              Login
            </button>
            <Link href="/auth/sign-up">
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Start Free
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

export default Login;
