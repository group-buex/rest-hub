import React, { FC } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import IUser from "interface/user";
import { userState } from "states/user";

const Header: FC = () => {
  const user = useRecoilValue<IUser>(userState);

  return (
    <nav className="flex justify-center w-full pt-3 pb-3 fixed z-10 bg-white top-0 backdrop-blur-2xl shadow">
      <div className="flex items-center justify-between md:w-9/12 w-11/12">
        <div className="">
          <Link href="/">
            <a className="text-4xl font-bold text-blue-500">
              Rest Hub <span className="text-sm"># BETA</span>
            </a>
          </Link>
        </div>
        {user._id && (
          <div className="flex flex-row justify-center gap-3 fade mr-6">
            {/* <img
              className="inline object-cover w-8 h-8 rounded-full"
              src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Profile image"
            /> */}
            <span
              className={`flex items-center justify-center object-cover w-8 h-8 rounded-full bg-gray-300 font-bold`}
            >
              {user.name.slice(0, 1)}
            </span>
            <p className="flex justify-center text-sm font-bold leading-8">
              {user.name}
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
