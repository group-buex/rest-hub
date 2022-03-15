import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Project from "components/admin/Project";

interface AdminProps {}

const Index: NextPage<AdminProps> = ({}) => {
  return <Project />;
};

export default Index;
