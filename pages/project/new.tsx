import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import New from "components/admin/Project/New";
import Link from "next/link";

interface NewProjectProps {}

const NewProject: NextPage<NewProjectProps> = ({}) => {
  return <New />;
};

export default NewProject;
