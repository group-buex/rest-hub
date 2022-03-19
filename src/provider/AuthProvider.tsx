import { getUserSelector, userState } from "states/user";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";

const AuthProvider = (props) => {
  const { contents, state, stateData } = useGetRecoilValueLoadable(
    getUserSelector(props.user_session),
    userState
  );

  return state !== "loading" && props.children;
};

export default AuthProvider;
