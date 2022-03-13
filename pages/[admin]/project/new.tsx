import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import New from "components/admin/Project/New";
import Link from "next/link";

interface NewProjectProps {
  param: string;
}

const NewProject: NextPage<NewProjectProps> = ({ param }) => {
  return <New admin={param} />;
};

export const getServerSideProps: GetServerSideProps<{ param: string }> = async (
  ctx
) => {
  return { props: { param: ctx.query.admin.toString() } };
};

export default NewProject;
