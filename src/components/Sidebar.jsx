import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChartBar,
  FaEnvelope,
  FaCalendar,
  FaFileAlt,
  FaBars,
  FaCalculator,
  FaClock,
} from "react-icons/fa";
import { HiBanknotes } from "react-icons/hi2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { id: "Dashboard", icon: FaHome, label: "Dashboard" },
    { id: "Profile", icon: FaUser, label: "Profile" },
    { id: "Analytics", icon: FaChartBar, label: "Analytics" },
    { id: "Messages", icon: FaEnvelope, label: "Messages" },
    { id: "Calendar", icon: FaCalendar, label: "Calendar" },
    { id: "Documents", icon: FaFileAlt, label: "Documents" },
    { id: "Settings", icon: FaCog, label: "Settings" },
  ];

  //Random Color Donut Chart
  const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  };

  const name = [
    { name: "Javascript", value: 30 },
    { name: "React", value: 50 },
    { name: "Tailwind", value: 100 },
    { name: "Nodejs", value: 400 },
  ];

  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Dashboard Chart Data and loop background color
  const chartData = {
    labels: name.map((n) => n.name),
    datasets: [
      {
        label: "Skills",
        data: name.map((n) => n.value),
        backgroundColor: name.map(() => randomColor()),
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const data = await response.json();
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Dashboard Content Component
  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-r from-amber-500 to-amber-400 rounded-xl shadow-lg p-5 text-white">
          <div className="flex items-center justify-between">
            <HiBanknotes className="w-12 h-12" />
            <div className="text-right">
              <h1 className="text-2xl font-bold">$12,500</h1>
              <p className="text-sm opacity-90">รายจ่าย</p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-r from-green-500 to-green-400 rounded-xl shadow-lg p-5 text-white">
          <div className="flex items-center justify-between">
            <FaClock className="w-12 h-12" />
            <div className="text-right">
              <h1 className="text-2xl font-bold">128 hrs</h1>
              <p className="text-sm opacity-90">เวลา</p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-r from-red-500 to-red-400 rounded-xl shadow-lg p-5 text-white">
          <div className="flex items-center justify-between">
            <FaCalculator className="w-12 h-12" />
            <div className="text-right">
              <h1 className="text-2xl font-bold">45</h1>
              <p className="text-sm opacity-90">โปรเจกต์</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart & Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            ค้นหาข้อมูล
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                เลือกวันที่
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                เลือกภาษา
              </label>
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                <option>Javascript</option>
                <option>React</option>
                <option>Tailwind</option>
                <option>Nodejs</option>
              </select>
            </div>
            <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
              ค้นหา
            </button>
          </div>
        </div>
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            สถิติการใช้งาน
          </h2>
          <div className="flex items-center justify-center">
            <div className="w-100 h-100">
              <Doughnut data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Pagination calculations
  const totalPages = Math.ceil(apiData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = apiData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const DocumentContent = () => (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {/* Header with Items Per Page Selector */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">แสดง</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            รายการ
          </span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          แสดง {startIndex + 1} - {Math.min(endIndex, apiData.length)} จาก{" "}
          {apiData.length} รายการ
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentData.map((item) => (
          <div
            key={item.id}
            className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 p-4 border-t border-gray-200 dark:border-gray-700">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            currentPage === 1
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
          }`}
        >
          ก่อนหน้า
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              disabled={page === "..."}
              className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                page === currentPage
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : page === "..."
                    ? "bg-transparent text-gray-500 cursor-default"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            currentPage === totalPages
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
          }`}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );

  // Placeholder content for other menus
  const PlaceholderContent = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400">เนื้อหาสำหรับ {title}</p>
    </div>
  );

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <DashboardContent />;
      case "Documents":
        return <DocumentContent />;
      default:
        return <PlaceholderContent title={activeMenu} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden md:flex flex-col bg-white dark:bg-gray-800 h-screen sticky top-0 
          border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-56" : "w-20"}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaBars className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
          {isOpen && (
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Menu
            </span>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 px-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`
                w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200
                ${
                  activeMenu === item.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }
                ${!isOpen ? "justify-center" : ""}
              `}
            >
              <item.icon className="text-xl shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:pt-6 pt-20">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          {activeMenu}
        </h1>
        {renderContent()}
      </main>

      {/* Mobile Top Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800 dark:text-white">
            Menu
          </span>
          <div className="flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`
                  p-2 rounded-lg transition-all duration-200
                  ${
                    activeMenu === item.id
                      ? "bg-blue-500 text-white"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                <item.icon className="text-lg" />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
