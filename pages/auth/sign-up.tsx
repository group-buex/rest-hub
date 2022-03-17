import React from "react";
import { GetServerSideProps } from "next";
import withAuth from "hoc/withAuth";
import AuthSignup from "components/auth/Signup";

const Signup = () => {
  return <AuthSignup />;
};

export const getServerSideProps: GetServerSideProps<{
  user_session: string;
}> = async ({ req }) => {
  return {
    props: {
      user_session: req.cookies.user_session || "",
    },
  };
};

export default withAuth(Signup)(false);
