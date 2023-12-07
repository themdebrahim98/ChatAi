"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const socials = [
    { title: "Home", link: "/" },
    { title: "About", link: "https://mdebraim98.netlify.app" },
    { title: "Github", link: "https://github.com/mdebrahim98" },
  ];
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to toggle dark mode here (e.g., change theme, update state in context, etc.)
  };

  return (
    <nav className=" bg-slate-700 text-white px-8 py-5 flex justify-between items-center fixed top-0 z-10 w-full gap-x-4">
      <div className="text-xl font-bold">CHAT AI</div>
      <div className="flex gap-x-4 md:gap-x-8 items-center justify-center">
        <div className="flex gap-x-4 md:gap-x-8 items-center justify-start">
          {socials.map((item, index) => (
            <li
              key={index}
              className="list-none cursor-pointer  duration-300 hover:underline underline-offset-8"
            >
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </div>

        <button onClick={toggleDarkMode} className="focus:outline-none">
          {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
