import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Project from "components/Project";
import withAuth from "hoc/withAuth";

interface AdminProps {}

const Index: NextPage<AdminProps> = ({}) => {
  return <Project />;
};

export const getServerSideProps: GetServerSideProps<{
  user_session: string;
}> = async ({ req, query }) => {
  return {
    props: {
      user_session: req.cookies.user_session || "",
    },
  };
};

export default withAuth(Index)(true);
