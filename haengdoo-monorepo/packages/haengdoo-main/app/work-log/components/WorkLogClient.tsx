"use client";
import { Clock, Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";

import { getUsersByShift } from "../../../api/userShift";
import {
  SelectedShift,
  UsersByShift,
} from "../../../haengdoo-monorepo/packages/haengdoo-main/types/types";
import WorkLogModal from "./WorkLogModal";

const WorkLogClient = () => {
  const [activeTab, setActiveTab] = useState("weekday");
  const [selectedShift, setSelectedShift] = useState<SelectedShift | undefined>(
    undefined
  );
  const [usersByShift, setUsersByShift] = useState<UsersByShift>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsersByShift();
      setUsersByShift(users);
    };
    fetchUsers();
  }, []);

  const handleItemClick = (shift: string, userId: number, username: string) => {
    setSelectedShift({ shift, userId, username });
  };

  const closeModal = () => {
    setSelectedShift(undefined);
  };

  const scheduleData = {
    weekday: [
      {
        title: "평일 오픈",
        shift: "평일 오픈",
        icon: <Clock className="w-5 h-5" />,
      },
      {
        title: "평일 미들",
        shift: "평일 미들",
        icon: <Sun className="w-5 h-5" />,
      },
      {
        title: "평일 마감",
        shift: "평일 마감",
        icon: <Moon className="w-5 h-5" />,
      },
    ],
    weekend: [
      {
        title: "주말 오픈",
        shift: "주말 오픈",
        icon: <Clock className="w-5 h-5" />,
      },
      {
        title: "주말 미들",
        shift: "주말 미들",
        icon: <Sun className="w-5 h-5" />,
      },
      {
        title: "주말 마감",
        shift: "주말 마감",
        icon: <Moon className="w-5 h-5" />,
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "weekday"
                ? "bg-green-50 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("weekday")}
          >
            평일
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "weekend"
                ? "bg-green-50 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("weekend")}
          >
            주말
          </button>
        </div>

        <div className="p-4">
          {scheduleData[activeTab].map((schedule, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex items-center mb-2">
                {schedule.icon}
                <h2 className="text-lg font-semibold ml-2">{schedule.title}</h2>
              </div>
              <ul className="bg-gray-50 rounded-md p-3">
                {usersByShift[schedule.shift]?.map((user) => (
                  <li
                    key={user.id}
                    className="text-gray-700 py-1 cursor-pointer hover:bg-gray-100 px-2 rounded"
                    onClick={() =>
                      handleItemClick(schedule.shift, user.id, user.username)
                    }
                  >
                    {user.username}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {selectedShift && (
        <WorkLogModal
          isOpen={true}
          onClose={closeModal}
          userId={selectedShift.userId}
          userShift={selectedShift.shift}
          username={selectedShift.username}
        />
      )}
    </div>
  );
};

export default WorkLogClient;
