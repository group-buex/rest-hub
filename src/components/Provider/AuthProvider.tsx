import useGetRecoilState from "hooks/useGetRecoilValueLoadable";
import IUser from "interface/user";
import React, { FC, useEffect } from "react";
import { checkAuthSelector, userState } from "states/user";
import { ReactNode } from "typings";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { stateData } = useGetRecoilState<IUser>(
    checkAuthSelector(null),
    userState
  );

  if (!stateData) return null;
  console.log(stateData);
  return <>{children}</>;
};

export default AuthProvider;
