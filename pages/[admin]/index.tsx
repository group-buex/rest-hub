import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import ProjectList from "components/admin/ProjectList";

interface AdminProps {
  param: string;
}

const Index: NextPage<AdminProps> = ({ param }) => {
  return <ProjectList admin={param} />;
};

export const getServerSideProps: GetServerSideProps<{ param: string }> = async (
  ctx
) => {
  return { props: { param: ctx.query.admin.toString() } };
};

export default Index;
