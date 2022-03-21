import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import ProjectDetail from "components/Project/Detail";
import withAuth from "hoc/withAuth";

interface ProjectItemProps {
  id: string;
}

const Index: NextPage<ProjectItemProps> = ({ id }) => {
  return <ProjectDetail id={id} />;
};

export const getServerSideProps: GetServerSideProps<{
  user_session: string;
}> = async ({ req, query }) => {
  return {
    props: {
      id: query.id.toString(),
      user_session: req.cookies.user_session || "",
    },
  };
};

export default withAuth(Index)();
