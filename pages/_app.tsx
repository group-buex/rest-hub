import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";
import { checkAuthSelector, userState } from "states/user";

const Provider = (props) => {
  const { contents, state } = useGetRecoilValueLoadable(
    checkAuthSelector(null),
    userState
  );

  // if (state === "loading") return <></>;

  return state !== "loading" && props.children;
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider {...pageProps}>
        <Component {...pageProps} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 1500 }}
        />
      </Provider>
    </RecoilRoot>
  );
}

export default MyApp;
