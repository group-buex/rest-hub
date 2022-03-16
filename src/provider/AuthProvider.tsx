import { useEffect } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import IUser from "interface/user";
import { userState } from "states/user";
import { getUser } from "actions/user";

const AuthProvider = (props) => {
  const user = useRecoilValue<IUser>(userState);
  const getUserInfo = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        await snapshot.getPromise(userState);

        const result = await getUser(props.user_session.toString());
        await set(userState, result ?? { _id: null });
      },
    [user]
  );

  useEffect(() => {
    if (props.user_session) {
      getUserInfo();
    }
  }, []);

  return props.children;
};

export default AuthProvider;
