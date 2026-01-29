import React from "react";
import Navbar from "./components/Navbar";
import { FaCalculator, FaClock, FaTimes } from "react-icons/fa";
import { HiBanknotes } from "react-icons/hi2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);

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

  // JavaScript Frameworks Usage Data from ohmycrawl.com (2025)
  const frameworkData = {
    labels: ["React", "Vue.js", "Angular", "Svelte", "Next.js", "SolidJS"],
    datasets: [
      {
        label: "Developer Usage (%)",
        data: [39.5, 15.4, 12.0, 6.5, 52.9, 1.2],
        backgroundColor: [
          "rgba(97, 218, 251, 0.8)", // React - cyan
          "rgba(65, 184, 131, 0.8)", // Vue - green
          "rgba(221, 0, 49, 0.8)", // Angular - red
          "rgba(255, 62, 0, 0.8)", // Svelte - orange
          "rgba(0, 0, 0, 0.8)", // Next.js - black
          "rgba(68, 107, 158, 0.8)", // SolidJS - blue
        ],
        borderColor: [
          "rgba(97, 218, 251, 1)",
          "rgba(65, 184, 131, 1)",
          "rgba(221, 0, 49, 1)",
          "rgba(255, 62, 0, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(68, 107, 158, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Most Popular JavaScript Frameworks in 2025",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        title: {
          display: true,
          text: "Usage (%)",
        },
      },
    },
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

        {/* JavaScript Frameworks Usage Bar Chart */}
        <div className="mt-5">
          <div className="bg-white rounded-xl shadow-md p-6">
            <Bar data={frameworkData} options={barOptions} />
            <p className="text-xs text-gray-500 mt-4 text-center">
              Source: ohmycrawl.com - Most Popular JavaScript Frameworks in 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
