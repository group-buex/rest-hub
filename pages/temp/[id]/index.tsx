import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Detail from "components/Project/Detail";

interface DetailProps {
  param: { admin: string; id: string };
}

const Index: NextPage<DetailProps> = ({ param }) => {
  return <Detail {...param} />;
};

export const getServerSideProps: GetServerSideProps<DetailProps> = async (
  ctx
) => {
  return {
    props: {
      param: { admin: ctx.query.admin.toString(), id: ctx.query.id.toString() },
    },
  };
};

export default Index;
