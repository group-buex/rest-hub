import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Project from "components/admin/Project";

interface AdminProps {
  param: string;
}

const Index: NextPage<AdminProps> = ({ param }) => {
  return <Project admin={param} />;
};

export const getServerSideProps: GetServerSideProps<{ param: string }> = async (
  ctx
) => {
  return { props: { param: ctx.query.admin.toString() } };
};

export default Index;
