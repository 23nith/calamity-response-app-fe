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

function Sidebar() {
  const [open, setOpen] = useState(true)
  const Menus = [
    { title: "Dashboard", src: Chart_fill },
    { title: "Inbox", src: Chart },
    { title: "Accounts", src: User, gap: true },
    { title: "Schedule", src: Calendar },
    { title: "Search", src: Search },
    { title: "Analytics", src: Chart },
    { title: "Files", src: Folder, gap: true },
    { title: "Setting", src: Setting },
  ]
  return (
    <div className="flex">
      <div className={`${open ? "w-72": "w-20"} duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}>
        <img
          src={control}
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${!open && "rotate-180"}`}
          onClick={()=>setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img src={logo} className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
          <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index)=>( 
            <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.gap ? "mt-9" : "mt-2" } ${index == 0 && "bg-light-white"}`}>
              <img src={menu.src} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home Page</h1>
      </div>
    </div>
  );
}

export default Sidebar;
