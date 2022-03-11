import React, { FC } from "react";
import { ReactNode } from "typings";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:w-6/12 w-10/12 items-center pt-3 pb-24 m-auto">
      {children}
    </div>
  );
};

export default Layout;
