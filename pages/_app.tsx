import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Layout from "components/Core/Layout";
import "../styles/globals.css";
import Header from "components/Core/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Header />
        <div className="flex flex-col w-full mt-16 pt-6">
          <Component {...pageProps} />
        </div>
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
