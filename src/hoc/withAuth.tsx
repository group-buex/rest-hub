/* eslint-disable react/display-name */
import React from "react";

import Redirect from "components/Redirect";
import { checkAuthSelector, userState } from "states/user";
import IUser from "interface/user";
import { useRecoilValue } from "recoil";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";

const withAuth =
  (Component: any) =>
  (checkVerify = true) => {
    return (props) => {
      const { _id } = useRecoilValue(userState);
      console.log(_id);

      // 로그인이 필요한 서비스 redirect = '/user/login'
      // if (checkVerify && !_id) return <Redirect ssr to="/auth/login" />;

      // 로그인이 필요없는 서비스지만 로그인이 된 상태로 들어온다면 redirect = '/'
      // if (!checkVerify && _id) return <Redirect ssr to="/" />;

      return <Component {...props} />;
    };
  };

export default withAuth;
