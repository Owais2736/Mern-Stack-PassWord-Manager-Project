import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#020617]/90 border-t border-teal-500/20 mt-16 py-8 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-teal-400 text-xl font-bold">Vaultify</h2>
        <p className="text-sm mt-1 text-gray-500">
          Minimal. Secure. Yours — Always Encrypted 🔐
        </p>

        <div className="flex justify-center gap-6 mt-5 text-xl text-gray-400">
          <a href="#" className="hover:text-teal-400 transition-all">
            <FaGithub />
          </a>
          <a href="#" className="hover:text-teal-400 transition-all">
            <FaLinkedin />
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Vaultify — Crafted by{" "}
          <span className="text-teal-400 font-semibold">Owais Ali</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
