import React from "react";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { HiDocumentReport } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { MdAddAlert } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";

function Sidebar({setShowLogin, setShowSignUp}) {
  const [open, setOpen] = useState(true);
  
  const onSignOut = () => {
    console.log("Sign out")
    setShowLogin(true)
    setShowSignUp(false)
  }

  const Menus = [
    { title: "Dashboard", src: <AiFillHome size="20"/> , route: "/"},
    { title: "Reports", src: <HiDocumentReport  size="20"/>, route: "/reports", gap: true },
    { title: "Areas", src: <FiMapPin size="20"/>, route: "/areas" },
    { title: "Users", src: <FaUsers size="20"/>, route: "/users" },
    { title: "Needs", src: <FaHandsHelping  size="20"/>, route: "/needs", gap: true },
    { title: "Donations", src: <GiReceiveMoney  size="20"/>, route: "/donations" },
    { title: "Calamities", src: <MdAddAlert  size="20"/>, route: "/calamities" },
    { title: "Messages", src: <AiOutlineMessage  size="20"/>, route: "/messages", gap: true },
    { title: "Sign-Out", src: <BiLogOut size="20"/>, click: onSignOut, route: "/", gap: true },
    // { title: "Inbox", src: Chart },
    // { title: "Accounts", src: User, gap: true },
    // { title: "Schedule", src: Calendar },
    // { title: "Search", src: Search },
    // { title: "Analytics", src: Chart },
    // { title: "Files", src: Folder, gap: true },light-greydark-gre
    // { title: "Setting", src: Setting },
  ];
  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 h-screen p-5 pt-8 bg-light-grey relative`}
    >
      

      <div className={`flex gap-x-4 items-center duration-300`}>
        <GiHamburgerMenu
          className={`text-dark-grey cursor-pointer duration-300 inline-grid mr-5 ${
            open && "rotate-[360deg]"
          }`}
          onClick={()=>setOpen(!open)}
        />
        <h1
          className={`text-dark-grey origin-left font-medium text-xl duration-300  ${
            !open && "scale-0 hidden"
          }`}
        >
          DummyText
        </h1>
      </div>
      
        
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <Link to={menu.route} >
            <li
              key={index}
              className={`text-dark-grey text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md ${
                menu.gap ? "mt-9" : "mt-2"
              } ${index == 0 && "bg-light-dark-grey"}`}
              onClick={menu.click}
              >
              {menu.src}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
  
}

export default Sidebar;
