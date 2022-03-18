import useGetRecoilValueLoadable from "hooks/useGetRecoilValueLoadable";
import IUser from "interface/user";
import Head from "next/head";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "states/user";
import { ReactNode } from "typings";
import Header from "./Header";
import SideBar from "./SideBar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  loading?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  title = "Rest Hub",
  loading = false,
}) => {
  const user = useRecoilValue<IUser>(userState);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Rest Hub" />
        <meta name="author" content="Group Buex" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Rest Hub" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/card.png" />
        <title>{!loading ? title : "Loading..."}</title>
      </Head>
      <Header user={user} />
      <SideBar user={user} />
      <div className="flex flex-col fade w-full mt-16 pt-6">
        <div className="flex flex-col md:w-11/12 w-11/12 items-center pt-3 m-auto">
          {children}
        </div>
        {loading && (
          <div className="absolute top-0 w-full h-full z-10 opacity-[0.5] bg-[#111827]" />
        )}
      </div>
    </>
  );
};

export default Layout;
