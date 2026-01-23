import React, { useState } from "react";
import { FaBars, FaReact } from "react-icons/fa";

function Navbar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className="shadow-md p-5 bg-linear-to-br from-indigo-600 to-purple-500 sticky top-0 z-20">
        <div className="container mx-auto flex md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <FaReact className="text-white w-5 h-5 animate-spin" />
            </div>
            <a href="#" className="text-white font-bold text-lg">
              ReactTailwind
            </a>
          </div>
          <div className="flex items-center gap-5">
            <button className="md:hidden" onClick={() => setShow(!show)}>
              <FaBars className="w-5 h-5 text-white" />
            </button>
            <div>
              <ul className="gap-5 md:flex hidden text-white font-semibold">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/random">Random</a>
                </li>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li>
                  <a href="/spreadsheet">Spreadsheet</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {show && (
        <div className="md:hidden fixed top-20 left-0 w-full z-50">
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setShow(false)}
          ></div>

          {/* menu */}
          <ul
            className="relative bg-linear-to-br from-indigo-300 to-purple-300
      flex flex-col gap-4 p-5 font-semibold shadow-lg
      animate-slideDown"
          >
            <li
              onClick={() => setShow(false)}
              className="hover:bg-purple-500 text-gray-700 hover:text-white px-4 py-2 rounded-xl"
            >
              Home
            </li>
            <li
              onClick={() => setShow(false)}
              className="hover:bg-purple-500 text-gray-700 hover:text-white px-4 py-2 rounded-xl"
            >
              About
            </li>
            <li
              onClick={() => setShow(false)}
              className="hover:bg-purple-500 text-gray-700 hover:text-white px-4 py-2 rounded-xl"
            >
              Services
            </li>
            <li
              onClick={() => setShow(false)}
              className="hover:bg-purple-500 text-gray-700 hover:text-white px-4 py-2 rounded-xl"
            >
              Contact
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
