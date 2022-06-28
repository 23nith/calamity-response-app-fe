import React from "react";
import { useState } from "react";
import control from "../assets/control.png";
import logo from "../assets/logo.png";
import Calendar from "../assets/Calendar.png";
import Chart_fill from "../assets/Chart_fill.png";
import Chart from "../assets/Chart.png";
import Chat from "../assets/Chat.png";
import Folder from "../assets/Folder.png";
import Search from "../assets/Search.png";
import Setting from "../assets/Setting.png";
import User from "../assets/User.png";
import { AiFillHome } from "react-icons/ai";
import { HiDocumentReport } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: <AiFillHome /> },
    { title: "Reports", src: <HiDocumentReport /> },
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
      

      <div className={`flex gap-x-4 items-center duration-500`}>
        <GiHamburgerMenu
          className={`text-dark-grey cursor-pointer duration-500 inline-grid mr-5 ${
            open && "rotate-[360deg]"
          }`}
          onClick={()=>setOpen(!open)}
        />
        <h1
          className={`text-dark-grey origin-left font-medium text-xl duration-500  ${
            !open && "scale-0 hidden"
          }`}
        >
          DummyText
        </h1>
      </div>
      
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className={`text-dark-grey text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white rounded-md ${
              menu.gap ? "mt-9" : "mt-2"
            } ${index == 0 && "bg-light-dark-grey"}`}
          >
            {menu.src}
            {/* <img src={menu.src} /> */}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
