/* eslint-disable react/display-name */
import React from "react";

import Redirect from "components/Redirect";
import { getUserSelector } from "states/user";
import { useRecoilValueLoadable } from "recoil";

const withAuth =
  (Component: any) =>
  (checkVerify = true) => {
    return (props) => {
      const userSession = props.user_session;

      const { contents, state } = useRecoilValueLoadable(
        getUserSelector(userSession)
      );

      // * contents must be exist before running withAuth hoc.

      if (state === "loading" || !contents) {
        return <></>;
      }

      if (checkVerify && !contents?._id) {
        return <Redirect ssr to="/auth/login" />;
      }

      if (!checkVerify && contents?._id) {
        return <Redirect ssr to="/" />;
      }

      return <Component {...props} />;
    };
  };

export default withAuth;
