import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import IUser from "interface/user";
import { getUserSelector, userState } from "states/user";
import { getUser } from "actions/user";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";

const AuthProvider = (props) => {
  const { contents, state, stateData } = useGetRecoilValueLoadable(
    getUserSelector(props.user_session),
    userState
  );

  return props.children;
};

export default AuthProvider;
