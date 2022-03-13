import React, { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <nav className="flex justify-center w-full pt-3 pb-3 fixed z-10 bg-white top-0 backdrop-blur-2xl shadow">
      <div className="flex justify-between md:w-9/12 w-11/12">
        <div className="">
          <Link href="/">
            <a className="text-4xl font-bold text-blue-500">Rest Hub</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
