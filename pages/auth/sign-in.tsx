import Layout from "components/Core/Layout";
import withAuth from "hoc/withAuth";
import { GetServerSideProps } from "next";
import React from "react";

const SignIn = () => {
  return (
    <Layout>
      <div>SignIn</div>
    </Layout>
  );
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

export default withAuth(SignIn)(false);
