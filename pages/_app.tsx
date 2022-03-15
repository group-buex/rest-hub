import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import Layout from "components/Core/Layout";
import Header from "components/Core/Header";
import AuthProvider from "components/Provider/AuthProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Layout>
          <Header />
          <div className="flex flex-col fade w-full mt-16 pt-6">
            <Component {...pageProps} />
          </div>
        </Layout>
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
