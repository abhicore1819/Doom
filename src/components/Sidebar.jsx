import React, { useState } from "react";
import {
  HomeIcon,
  Search,
  Library,
  LogIn,
  Menu,
  Home,
  ImageOff,
} from "lucide-react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div
      className={`bg-[#141414] w-full md:w-1/2 h-screen p-5 space-y-5 fixed top-0 left-0 z-10 transition-transform ease-in-out duration-500`}
    >
      <div className="w-full">
        {/* logo */}
        <h1 className={`p-5 text-5xl capitalize font-bold text-white`}>Doom</h1>
      </div>
      <ul
        className={`w-full  p-5 text-white capitalize text-[16px] lg:text-2xl space-y-5`}
      >
        {/* menu */}
        <li className="flex cursor-pointer items-center gap-5 ">
          <Home />
          <NavLink
            className={(params) =>
              params.isActive
                ? "bg-black w-full rounded-2xl p-2 text-white"
                : ""
            }
            to={"/"}
          >
            home
          </NavLink>{" "}
        </li>
        <li className="flex cursor-pointer items-center gap-5">
          <Search />
          <NavLink
            className={(params) =>
              params.isActive
                ? "bg-black w-full rounded-2xl p-2 text-white"
                : ""
            }
            to={"/search"}
          >
            search
          </NavLink>{" "}
        </li>
        <li className="flex cursor-pointer items-center gap-5">
          <LogIn />
          <NavLink
            className={(params) =>
              params.isActive
                ? "bg-black w-full rounded-2xl p-2 text-white"
                : ""
            }
            to={"/login"}
          >
            register
          </NavLink>{" "}
        </li>
        {/* <li className="flex cursor-pointer items-center gap-5" ><Library /><NavLink className={(params) => (params.isActive ? 'bg-black w-full rounded-2xl p-2 text-white' : '')}  to={'/library'}>playlist</NavLink> </li> */}
      </ul>
    </div>
  );
}
