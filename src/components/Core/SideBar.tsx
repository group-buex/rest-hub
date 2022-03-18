import IUser from "interface/user";
import React, { FC, useState } from "react";
import Link from "next/link";
// import IconDoubleArrow from "/assets/double_arrow.svg";
import IconArrowDown from "/assets/keyboard_arrow_down.svg";

interface SideBarProps {
  user: IUser;
}

const MenuGroup = ({ list, title = "Enter title" }) => {
  return (
    <span>
      <p className="font-semibold  text-sm mb-3 pl-3">{title}</p>
      {list.length > 0 &&
        list.map((item) => (
          <Link key={item.projectId} href={`/project/${item.projectId}`}>
            <a className="text-md block py-1 px-3 rounded-sm text-ellipsis  hover:hover:bg-gray-600 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              {item.title}
            </a>
          </Link>
        ))}
    </span>
  );
};

const MenuIcon = ({ show, onClick }) => {
  return (
    <button
      className="flex justify-end w-[30px] focus:outline-none focus:shadow-outline"
      onClick={onClick}
    >
      {show ? (
        <svg
          className="rotate-180"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z"
            fill="#c7cfda"
          />
          <path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" fill="#c7cfda" />
        </svg>
      ) : (
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </button>
  );
};

const SideBar: FC<SideBarProps> = ({ user }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleClickMenuButton = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="md:fixed fixed md:top-[65px] top-[57px] z-[3] bg-[#313e58]">
      <div className="py-2 pr-2">
        <MenuIcon show={showMenu} onClick={handleClickMenuButton} />
      </div>
      {showMenu && (
        <div className="w-[240px]  rounded-br-lg">
          <nav className="md:fixed fixed md:top-[65px] top-[57px] z-[8] flex flex-col gap-8 flex-grow bg-[#313e58] w-[240px] pt-2 pb-4 md:overflow-y-auto  mt-10">
            <MenuGroup list={user.project} title="Projcet" />
            {/* {user?.shared?.length > 0 && <MenuGroup list={[]} title="Shared" />} */}
            <MenuGroup list={[]} title="Shared" />
          </nav>
        </div>
      )}
    </div>
  );
};

export default SideBar;
