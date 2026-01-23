"use client";

import Navbar from "./components/Navbar";
import { FaSearch, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function App() {
  const [arrayList, setArrayList] = useState([]);

  useEffect(() => {
    fetchDisneyCharacter();
  }, []);

  const fetchDisneyCharacter = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon-form");
    const data = await res.json();
    setArrayList(data.results);
    console.log(data);
  };
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-100 to-purple-300">
        <Navbar />
        <div className="container mx-auto mt-5 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
            className="flex items-center justify-center md:justify-center"
          >
            <div className="relative">
              <input
                type="text"
                className="pl-10 border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 md:w-[500px] w-80"
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 p-4"
          >
            {arrayList.map((ch, index) => (
              <div
                key={index}
                className="px-6 py-2 bg-white rounded-xl shadow-md"
              >
                <div className="flex items-center justify-center bg-purple-50 h-48 rounded-xl">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                    alt={ch.name}
                    width={200}
                    height={200}
                  />
                </div>
                <h1 className="text-2xl font-bold text-center mt-5">
                  {ch.name}
                </h1>

                <button className="w-full bg-purple-500 text-white py-2 rounded-xl mt-5">
                  View Pokemon
                </button>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="p-4"
          >
            <div className="bg-white p-5 flex items-start justify-around rounded-xl space-y-3">
              <div className="flex md:items-center items-start gap-4 md:gap-12 flex-col md:flex-row">
                <div>
                  <h1>Name: Natdanai Jansomboon</h1>
                </div>
                <div>
                  <h1>Position: Web Developer (Software Engineer)</h1>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      // Will be used when gesture starts
                      transition: { duration: 0.1 },
                    }}
                    // Will be used when gesture ends
                    transition={{ duration: 0.5 }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                    onClick={() => window.open("/pdf", "_blank")}
                  >
                    View
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      // Will be used when gesture starts
                      transition: { duration: 0.1 },
                    }}
                    // Will be used when gesture ends
                    transition={{ duration: 0.5 }}
                    className="bg-amber-500 text-white px-4 py-2 rounded-xl"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      // Will be used when gesture starts
                      transition: { duration: 0.1 },
                    }}
                    // Will be used when gesture ends
                    transition={{ duration: 0.5 }}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default App;
