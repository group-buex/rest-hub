import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import AuthProvider from "provider/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider {...pageProps}>
        <Component {...pageProps} />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 1500 }}
        />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
