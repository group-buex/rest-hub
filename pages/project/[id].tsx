import type { NextPage } from "next";
import { GetServerSideProps } from "next";

interface ProjectItemProps {
  id: string;
}

const Index: NextPage<ProjectItemProps> = ({ id }) => {
  return <div>Index</div>;
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

export default Index;
