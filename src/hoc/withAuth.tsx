import Redirect from "components/Redirect";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";
import IUser from "interface/user";
import { checkAuthSelector, userState } from "states/user";

const withAuth =
  (Component) =>
  (role = "guest", checkVerified = true) => {
    return (props) => {
      const { contents, state, stateData } = useGetRecoilValueLoadable<IUser>(
        checkAuthSelector(props.user_session),
        userState
      );

      if (state === "loading") return <div>Loading...!@#</div>;
      // state === "hasValue" && console.log(2);
      // console.log(contents);

      // // 로그인이 필요한 서비스 redirect = '/auth/login'
      // if (access && !checkLogin) return <Redirect ssr to="/auth/login" />;
      if (checkVerified && !stateData?._id) {
        return <Redirect ssr to="/auth/login" />;
      }

      // // 로그인이 필요없는 서비스지만 로그인이 된 상태로 들어온다면 redirect = '/'
      // if (!access && checkLogin) return <Redirect ssr to="/" />;
      // if (checkVerified && stateData._id) {
      //   return <Redirect ssr to="/" />;
      // }

      return <Component {...props} />;
    };
  };

export default withAuth;
