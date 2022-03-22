import React, { FC } from "react";
import Link from "next/link";
import IUser from "interface/user";

interface HeaderProps {
  user: IUser;
}

const Header: FC<HeaderProps> = ({ user = null }) => {
  return (
    <nav className="flex justify-center w-full pt-3 pb-3 fixed z-10 bg-[#111827] top-0 backdrop-blur-2xl shadow border-b border-gray-500">
      <div className="flex items-center justify-between w-11/12">
        <Link href="/">
          <a className="md:text-4xl text-2xl font-bold text-blue-500">
            Rest Hub <span className="text-sm"># Pre-Alpha</span>
          </a>
        </Link>
        {user?._id ? (
          <div className="flex flex-row justify-center gap-3">
            {/* <img
              className="inline object-cover w-8 h-8 rounded-full"
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Profile image"
            /> */}
            <span className="flex items-center justify-center object-cover w-8 h-8 rounded-full bg-cyan-800 font-bold">
              {user.name.slice(0, 1)}
            </span>
            <p className="md:flex hidden justify-center text-sm font-bold leading-8">
              {user.name}
            </p>
          </div>
        ) : (
          <Link href="/auth/login">
            <a className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-400">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
