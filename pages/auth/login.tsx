import type { NextPage } from "next";
import AuthLogin from "components/auth/Login";
import withAuth from "hoc/withAuth";

const Login: NextPage = () => {
  return <AuthLogin />;
};

export default Login;
