import React from "react";
import { FaLock, FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#020617]/90 via-[#0f172a]/80 to-[#020617]/90 backdrop-blur-xl border-b border-teal-500/20 shadow-[0_0_30px_rgba(45,212,191,0.15)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href={"/"}
          className="flex items-center gap-2 text-teal-400 text-2xl font-extrabold tracking-wider select-none"
        >
          <FaLock className="text-teal-400 drop-shadow-[0_0_6px_#2dd4bf]" />
          Vault<span className="text-white">ify</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-300">
          {["Dashboard", "Vault", "Security", "Settings"].map((item, i) => (
            <li key={i}>
              <a
                href="#"
                className="relative group hover:text-teal-400 transition-all duration-300"
              >
                {item}
                <span className="absolute left-0 bottom-[-3px] w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-5 text-lg text-gray-400">
          <a href="#" className="hover:text-teal-400 transition-colors">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-teal-400 transition-colors">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
