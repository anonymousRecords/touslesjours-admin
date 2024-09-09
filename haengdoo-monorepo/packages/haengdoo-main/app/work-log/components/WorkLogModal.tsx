"use client";
import { format, addMonths, subMonths } from "date-fns";
import React, { useState, useEffect, useCallback } from "react";
import {
  addWorkLog,
  deleteWorkLog,
  getShiftTimes,
  getWorkLogs,
  updateWorkLog,
} from "../../../api/workLog";
import { MINIMUM_WAGE, WORK_LOG_TABLE_HEADERS } from "../../../constants";
import { WorkLog } from "../../../haengdoo-monorepo/packages/haengdoo-main/types/types";

interface WorkLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userShift: string;
  username: string;
}

const WorkLogModal = ({
  isOpen,
  onClose,
  userId,
  userShift,
  username,
}: WorkLogModalProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [salary, setSalary] = useState(0);
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [newLog, setNewLog] = useState<
    Omit<WorkLog, "id" | "created_at" | "updated_at">
  >({
    user_id: userId,
    date: format(new Date(), "yyyy-MM-dd"),
    shift: userShift,
    start_time: "",
    end_time: "",
    hours: 0,
  });

  const fetchWorkLogs = useCallback(async () => {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const logs = await getWorkLogs(
      userId,
      format(startDate, "yyyy-MM-dd"),
      format(endDate, "yyyy-MM-dd")
    );
    setWorkLogs(logs);
    calculateTotalHoursAndSalary(logs);
  }, [userId, currentDate]);

  useEffect(() => {
    if (isOpen) {
      fetchWorkLogs();
    }
  }, [isOpen, fetchWorkLogs]);

  const calculateTotalHoursAndSalary = (logs: WorkLog[]) => {
    const total = logs.reduce((acc, log) => acc + log.hours, 0);
    setTotalHours(total);
    setSalary(total * MINIMUM_WAGE);
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handleAddWorkLog = () => {
    setIsAddingLog(true);
    const { startTime, endTime } = getShiftTimes(userShift);
    setNewLog({
      user_id: userId,
      date: format(new Date(), "yyyy-MM-dd"),
      shift: userShift,
      start_time: startTime,
      end_time: endTime,
      hours: 5,
    });
  };

  const handleSaveNewLog = async () => {
    const addedLog = await addWorkLog(newLog);
    if (addedLog) {
      setWorkLogs([...workLogs, addedLog]);
      calculateTotalHoursAndSalary([...workLogs, addedLog]);
      setIsAddingLog(false);
    }
  };

  const handleEditWorkLog = async (
    logId: number,
    updatedLog: Partial<WorkLog>
  ) => {
    const editedLog = await updateWorkLog(logId, updatedLog);
    if (editedLog) {
      const updatedLogs = workLogs.map((log) =>
        log.id === logId ? editedLog : log
      );
      setWorkLogs(updatedLogs);
      calculateTotalHoursAndSalary(updatedLogs);
    }
  };

  const handleDeleteWorkLog = async (logId: number) => {
    const isDeleted = await deleteWorkLog(logId);
    if (isDeleted) {
      const updatedLogs = workLogs.filter((log) => log.id !== logId);
      setWorkLogs(updatedLogs);
      calculateTotalHoursAndSalary(updatedLogs);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
        <div className="flex flex-col justify-between items-center mb-4">
          <div className="flex justify-evenly items-center">
            <span>{username}님의 근무 기록</span>
            <button onClick={onClose} className="text-2xl">
              &times;
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousMonth}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              &lt;
            </button>
            <span className="text-xl font-bold">
              {format(currentDate, "M월")}
            </span>
            <button
              onClick={handleNextMonth}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              &gt;
            </button>
          </div>
        </div>

        <table className="w-full mb-4">
          <thead>
            <tr>
              {WORK_LOG_TABLE_HEADERS.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workLogs.map((log, index) => (
              <tr key={log.id}>
                <td>{format(new Date(log.date), "yyyy-MM-dd")}</td>
                <td>{log.start_time}</td>
                <td>{log.end_time}</td>
                <td>{log.hours}</td>
                <td>
                  {workLogs
                    .slice(0, index + 1)
                    .reduce((acc, cur) => acc + cur.hours, 0)}
                </td>
                <td>
                  <button
                    onClick={() => handleEditWorkLog(log.id, {})}
                    className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteWorkLog(log.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isAddingLog ? (
          <div className="mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold mb-2">새 근무 기록 추가</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  날짜
                </label>
                <input
                  type="date"
                  value={newLog.date}
                  onChange={(e) =>
                    setNewLog({ ...newLog, date: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  근무 유형
                </label>
                <input
                  type="text"
                  value={newLog.shift}
                  onChange={(e) =>
                    setNewLog({ ...newLog, shift: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  출근 시간
                </label>
                <input
                  type="time"
                  value={newLog.start_time}
                  onChange={(e) =>
                    setNewLog({ ...newLog, start_time: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  퇴근 시간
                </label>
                <input
                  type="time"
                  value={newLog.end_time}
                  onChange={(e) =>
                    setNewLog({ ...newLog, end_time: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  근무 시간
                </label>
                <input
                  type="number"
                  value={newLog.hours}
                  onChange={(e) =>
                    setNewLog({ ...newLog, hours: parseFloat(e.target.value) })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingLog(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                취소
              </button>
              <button
                onClick={handleSaveNewLog}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                완료
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <button
              onClick={handleAddWorkLog}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              추가
            </button>
          </div>
        )}

        <div className="text-right">
          <p>총 근무 시간: {totalHours}시간</p>
          <p>예상 월급: {salary.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default WorkLogModal;
