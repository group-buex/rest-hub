import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import New from "components/Project/New";
import withAuth from "hoc/withAuth";

interface NewProjectProps {}

const NewProject: NextPage<NewProjectProps> = ({}) => {
  return <New />;
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

export default withAuth(NewProject)();
