import Head from "next/head";
import React, { FC } from "react";
import { ReactNode } from "typings";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:w-9/12 w-11/12 items-center pt-3 pb-24 m-auto">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Rest Hub" />
        <meta name="author" content="Group Buex" />
        <meta name="author" content="Buex" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Rest Hub" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/card.png" />
        <title>Rest Hub</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
