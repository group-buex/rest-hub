import type { AppProps } from "next/app";
import { RecoilRoot, useRecoilValueLoadable } from "recoil";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";
import IUser from "interface/user";
import { checkAuthSelector, userState } from "states/user";

const Provider = (props) => {
  // const { contents, state, stateData } = useGetRecoilValueLoadable<IUser>(
  //   checkAuthSelector(props.user_session),
  //   userState
  // );
  const { contents, state } = useRecoilValueLoadable(checkAuthSelector(null));

  if (state === "loading") return <div>Loading....</div>;

  return <>{props.children}</>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider {...pageProps}>
        <Component {...pageProps} />
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 1500 }}
      />
    </RecoilRoot>
  );
}

export default MyApp;
