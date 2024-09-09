"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  deleteSandwichSchedule,
  getSandwichScheduleByDate,
  getSandwichSchedulesByPeriod,
  upsertSandwichSchedule,
} from "../../../api/sandwich";
import { Dropdown } from "../../../components/Dropdown";
import {
  colorsContent,
  sandwichColumns,
  sandwichRows,
} from "../../../constants";
import { SandwichSchedule } from "../../../types/types";

interface SandwichTableProps {
  weekArray: string[];
}

interface DropdownDataType {
  [key: string]: {
    [key: string]: string;
  };
}

const SandwichTable: React.FC<SandwichTableProps> = ({ weekArray }) => {
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [dropdownData, setDropdownData] = useState<DropdownDataType>({});
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const period = `${weekArray[0]} ~ ${weekArray[6]}`;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialData = await getSandwichSchedulesByPeriod(period);
        onDropdownChange(initialData);
      } catch (error) {
        console.error("초기 데이터 로딩 중 오류 발생:", error);
      }
    };

    fetchInitialData();
  }, [period]);

  const onDropdownChange = (data: SandwichSchedule[]) => {
    const newDropdownData: DropdownDataType = {};
    data.forEach((item) => {
      if (!newDropdownData[item.sandwich_type]) {
        newDropdownData[item.sandwich_type] = {};
      }
      newDropdownData[item.sandwich_type][item.date] = item.dropdown_data || "";
    });
    setDropdownData(newDropdownData);
  };

  const handleDropDownChange = async (
    sandwichType: string,
    date: string,
    colorIndex: string
  ) => {
    try {
      await upsertSandwichSchedule({
        id: `${date}${sandwichType}`,
        period,
        date,
        days: format(new Date(date), "E", { locale: ko }),
        sandwich_type: sandwichType,
        dropdown_data: colorsContent[colorIndex],
      });

      const existingData = await getSandwichSchedulesByPeriod(period);
      onDropdownChange(existingData);
    } catch (error) {
      console.error("드롭다운 변경 중 오류 발생:", error);
    }
  };

  const handleDeleteAllData = async (date: string | null) => {
    if (!date) {
      return;
    }

    try {
      await deleteSandwichSchedule(date);
      const existingData = await getSandwichSchedulesByPeriod(period);
      onDropdownChange(existingData);
    } catch (error) {
      console.error("데이터 삭제 중 오류 발생:", error);
    }
  };

  const handleFillAllData = async (date: string | null) => {
    if (!date || !activeDay) {
      return;
    }

    try {
      const previousDate = format(
        new Date(date).valueOf() - 86400000,
        "yyyy-MM-dd"
      );
      const previousData = await getSandwichScheduleByDate(previousDate);

      if (previousData && previousData.length > 0) {
        const newData: SandwichSchedule[] = previousData.map((item) => {
          const nextDropdownData = item.dropdown_data
            ? { 주: "녹", 녹: "흰", 흰: "주" }[item.dropdown_data] ?? "기타"
            : "기타";

          return {
            ...item,
            id: `${activeDay}${item.sandwich_type}`,
            period: `${weekArray[0]} ~ ${weekArray[6]}`,
            date: activeDay,
            days: format(new Date(activeDay), "E", { locale: ko }),
            dropdown_data: nextDropdownData,
          };
        });

        for (const item of newData) {
          await upsertSandwichSchedule(item);
        }

        const existingData = await getSandwichSchedulesByPeriod(period);
        onDropdownChange(existingData);
      }
    } catch (error) {
      console.error("데이터 채우기 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <div className="flex gap-5">
          <button
            className="bg-[#0C4630] text-white font-semibold px-3 py-1 rounded-md"
            onClick={() => handleFillAllData(activeDay)}
          >
            모두 채우기 (+)
          </button>
          <button
            className="bg-[#0C4630] text-white font-semibold px-3 py-1 rounded-md"
            onClick={() => handleDeleteAllData(activeDay)}
          >
            모두 지우기 (-)
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {sandwichRows.map((row, index) => (
              <th key={index}>{row}</th>
            ))}
          </tr>
          <tr>
            <th></th>
            {weekArray.map((week, index) => (
              <th
                key={index}
                onClick={() => setActiveDay(week)}
                className="text-lg font-extralight cursor-pointer"
              >
                {week}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sandwichColumns.map((column) => (
            <tr key={column}>
              <td>{column}</td>
              {weekArray.map((date) => (
                <td key={date} className="text-center">
                  <Dropdown
                    buttonContent={dropdownData[column]?.[date] || ""}
                    dropdownContent={colorsContent}
                    onSelect={(index: string) =>
                      handleDropDownChange(column, date, index)
                    }
                    isToday={date === todayDate}
                    isActive={date === activeDay}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SandwichTable;
