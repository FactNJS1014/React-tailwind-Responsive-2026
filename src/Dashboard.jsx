import React from "react";
import Navbar from "./components/Navbar";
import { FaCalculator, FaClock, FaTimes } from "react-icons/fa";
import { HiBanknotes } from "react-icons/hi2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  };

  const name = ["Javascript", "React", "Tailwind", "Nodejs"];
  const data = {
    labels: name,
    datasets: [
      {
        label: "My First Dataset",
        data: [30, 50, 100, 400],
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-purple-300">
      <Navbar />
      <div className="container mx-auto p-5 max-w-7xl ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-linear-to-r from-amber-600 to-amber-400 rounded-xl shadow-md w-full text-white ">
            <div className="p-5">
              <div className="flex items-center gap-2 justify-between">
                <HiBanknotes className="w-12 h-12" />
                <div>
                  <h1 className="text-xl font-bold">Costs</h1>
                  <p className="text-md font-semibold">รายจ่าย</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-green-600  to-green-400 rounded-xl shadow-md w-full text-white">
            <div className="p-5">
              <div className="flex items-center gap-2 justify-between">
                <FaClock className="w-12 h-12" />
                <div>
                  <h1 className="text-xl font-bold">Times</h1>
                  <p className="text-md font-semibold">เวลา</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r from-red-600 to-red-400 rounded-xl shadow-md w-full text-white">
            <div className="p-5">
              <div className="flex items-center gap-2 justify-between">
                <FaCalculator className="w-12 h-12" />
                <div>
                  <h1 className="text-xl font-bold">Calculator</h1>
                  <p className="text-md font-semibold">คำนวณ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 mt-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="font-semibold text-gray-700">
                  เลือกวันที่
                </label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="font-semibold text-gray-700">
                  เลือกภาษา
                </label>
                <select
                  name=""
                  id=""
                  className="border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Javascript</option>
                  <option value="">React</option>
                  <option value="">Tailwind</option>
                  <option value="">Nodejs</option>
                </select>
              </div>
              <div>
                <button className="bg-linear-to-br from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl w-full">
                  ค้นหา
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-md w-full text-white p-6 mt-5 flex items-center justify-center">
              <div className="w-100 h-100">
                <Doughnut data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
