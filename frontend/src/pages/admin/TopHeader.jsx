import React from "react";
import { Search } from "lucide-react";

const TopHeader = ({ activeTab, searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800 shadow-md z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <div className="flex items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <div className="ml-4 flex items-center">
            <div className="h-8 w-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="ml-2 text-sm font-medium text-gray-300">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
