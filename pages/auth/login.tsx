import type { NextPage } from "next";
import AuthLogin from "components/auth/Login";
import withAuth from "hoc/withAuth";

const Login: NextPage = () => {
  return <AuthLogin />;
};

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      user_session: req.cookies.user_session || "",
    },
  };
};

export default withAuth(Login)(false);
