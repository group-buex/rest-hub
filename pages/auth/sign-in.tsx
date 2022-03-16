import withAuth from "hoc/withAuth";
import React from "react";

const SignIn = () => {
  return <div>SignIn</div>;
};

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      user_session: req.cookies.user_session || "",
    },
  };
};

export default withAuth(SignIn)(true);
