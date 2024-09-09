"use client";

import { format, isWeekend } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import {
  getWorkSchedules,
  insertWorkSchedule,
  upsertWorkSchedule,
} from "../../../api/workSchedule";
import { Accordian } from "../../../components/Accordian";
import { Dropdown } from "../../../components/Dropdown";
import { Modal } from "../../../components/Modal";
import { personList } from "../../../constants";

import Avatar from "./Avatar";
import { WorkSchedule } from "../../../types/types";
import { getMonthlyWorkSchedules } from "../../../utils/getMonthlyWorkScheduleData";
import { isPastDate } from "../../../utils/isPastDate";
import { getDefaultWorkSchedule } from "../../../utils/getDefaultWorkSchdule";
import getMetionCount from "../../../utils/getMetionCount";
import { getWeekendsInMonth } from "../../../utils/getWeekendsInMonth";

const dropdownContents = ["1번 뚜둥이", "2번 뚜둥이", "3번 뚜둥이"];

export default function ColdPlateClient() {
  const [selectedWorker1, setSelectedWorker1] = useState<string | null>(null);
  const [selectedWorker2, setSelectedWorker2] = useState<string | null>(null);
  const [workSchedulesData, setWorkSchedulesData] = useState<WorkSchedule[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 저장하기 버튼 클릭 시 실행되는 함수
  const handleSaveClick = async () => {
    // selectedDate로 선택한 날짜의 데이터를 가져와서 수정
    const selectedData = workSchedulesData.find(
      (worker) => worker.date === selectedDate
    );

    if (selectedData && selectedWorker1 && selectedWorker2) {
      const newData = {
        ...selectedData,
        workers: [selectedWorker1, selectedWorker2],
      };

      upsertWorkSchedule(newData);

      const updatedData = await getWorkSchedules();
      const monthlyWorkScheduleData = getMonthlyWorkSchedules(
        updatedData,
        monthOfSelectedDate
      );
      setWorkSchedulesData(monthlyWorkScheduleData);
    }

    setSelectedWorker1(null);
    setSelectedWorker2(null);
    setIsModalOpen(false);
  };

  // TO DO: 코드 중복 제거 필요
  const [isAccordianOpen1, setIsAccordianOpen1] = useState(false);
  const [isAccordianOpen2, setIsAccordianOpen2] = useState(false);
  const [isAccordianOpen3, setIsAccordianOpen3] = useState(false);

  const handleAccordianClick1 = () => {
    setIsAccordianOpen1(!isAccordianOpen1);
  };

  const handleAccordianClick2 = () => {
    setIsAccordianOpen2(!isAccordianOpen2);
  };

  const handleAccordianClick3 = () => {
    setIsAccordianOpen3(!isAccordianOpen3);
  };

  const [selectedDate, onChange] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const [yearOfSelectedDate, monthOfSelectedDate] = selectedDate
    .split("-")
    .map(Number);

  // 달력 날짜 변경 & 모달창 열기
  const handleDateChange = (date: string) => {
    // 주말이면서 현재나 과거 날짜가 아니면 상태 변경
    if (isWeekend(date) && !isPastDate(new Date(date))) {
      setSelectedWorker1(
        workSchedulesData.find((worker) => worker.date === date)
          ?.workers?.[0] || null
      );
      setSelectedWorker2(
        workSchedulesData.find((worker) => worker.date === date)
          ?.workers?.[1] || null
      );
      setIsModalOpen(true);
    }
  };

  // 작업자 할당 데이터 추가
  useEffect(() => {
    // const weekendArray = generateMonthlyWeekendArray(yearOfSelectedDate, monthOfSelectedDate);

    // // 주말에 작업자 할당
    // const assignedWorkers = assignWorkers(weekendArray);
    const assignedWorkers = getDefaultWorkSchedule(
      yearOfSelectedDate,
      monthOfSelectedDate
    );

    const addWorkSchedule = async () => {
      const existingData = await getWorkSchedules();

      for (const newAssignment of assignedWorkers) {
        const isDuplicateDate = existingData.some((assignment) => {
          return assignment.date === newAssignment.date;
        });

        if (!isDuplicateDate) {
          await insertWorkSchedule(newAssignment);
        }
      }

      const updatedData = await getWorkSchedules();

      const monthlyWorkScheduleData = getMonthlyWorkSchedules(
        updatedData,
        monthOfSelectedDate
      );

      setWorkSchedulesData(monthlyWorkScheduleData);
    };

    addWorkSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify([yearOfSelectedDate, monthOfSelectedDate])]);

  // 작업자 목록 출력
  const renderWorkers = () => {
    return workSchedulesData.map((assignment) => {
      if (!assignment.workers) {
        return null;
      }

      return (
        <div key={assignment.id} className="font-semibold">
          {assignment.date}일의 담당자:
          <p className="font-normal">
            {assignment.workers[0]}, {assignment.workers[1]}
          </p>
        </div>
      );
    });
  };

  // 특정 담당자의 작업 횟수 카운트
  const oneWorkermentionCounts = getMetionCount(
    "1번 뚜둥이",
    workSchedulesData
  );
  const twoWorkermentionCounts = getMetionCount(
    "2번 뚜둥이",
    workSchedulesData
  );
  const threeWorkermentionCounts = getMetionCount(
    "3번 뚜둥이",
    workSchedulesData
  );

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen ">
      <main className="flex flex-col gap-10 items-center justify-center flex-1 p-4">
        <Calendar
          locale="ko-KR"
          value={selectedDate}
          onChange={(value) => {
            if (value instanceof Date) {
              const formattedDate = format(value, "yyyy-MM-dd");
              onChange(formattedDate);
              handleDateChange(formattedDate);
            }
          }}
          onActiveStartDateChange={({ activeStartDate }) => {
            if (!activeStartDate) {
              return;
            }

            onChange(format(activeStartDate, "yyyy-MM-dd"));
          }}
          showNeighboringMonth={false}
          tileContent={({ date }) => {
            if (!isWeekend(date)) {
              return null;
            }

            const workSchedule = workSchedulesData.find(
              (worker) => worker.date === format(date, "yyyy-MM-dd")
            );

            const worker1 = personList.find(
              (person) => person.name === workSchedule?.workers?.[0]
            );
            const worker2 = personList.find(
              (person) => person.name === workSchedule?.workers?.[1]
            );

            return (
              <div className="flex gap-1">
                <Avatar backgroundColor={worker1?.color || "lightgray"} />
                <Avatar backgroundColor={worker2?.color || "lightgray"} />
              </div>
            );
          }}
        />
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <h3 className="font-bold mb-3">{selectedDate} 작업자 수정 모달</h3>
            <div className="flex items-center gap-5 mb-2">
              <h1>담당자 1</h1>
              <Dropdown
                buttonContent={selectedWorker1}
                dropdownContent={dropdownContents}
                onSelect={(workerIndex) =>
                  setSelectedWorker1(personList[Number(workerIndex)].name)
                }
              />
            </div>
            <div className="flex items-center gap-5">
              <h1>담당자 2</h1>
              <Dropdown
                buttonContent={selectedWorker2}
                dropdownContent={dropdownContents}
                onSelect={(workerIndex) =>
                  setSelectedWorker2(personList[Number(workerIndex)].name)
                }
              />
            </div>
            <button
              className="bg-blue-500 text-white w-full mt-5 rounded-lg p-2"
              onClick={handleSaveClick}
            >
              저장
            </button>
          </Modal>
        )}
        <section className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-md mt-4 flex flex-col justify-center">
          <p className="text-lg font-semibold mb-2 text-center">
            {monthOfSelectedDate}월 뚜둥이 냉판 작업
          </p>
          <p className="text-xs mb-4 text-center">
            {monthOfSelectedDate}월달 주말은 총{" "}
            {getWeekendsInMonth(yearOfSelectedDate, monthOfSelectedDate).length}
            일입니다.
          </p>
          <p className="text-lg font-semibold mb-2">작업 관련</p>
          <div className="flex flex-col gap-2 mb-6">
            <Accordian
              title="작업 담당 내역"
              isAccordianOpen={isAccordianOpen1}
              onClick={handleAccordianClick1}
            >
              {renderWorkers()}
            </Accordian>
            <Accordian
              title="뚜둥이 작업 횟수"
              isAccordianOpen={isAccordianOpen2}
              onClick={handleAccordianClick2}
            >
              {
                <>
                  <p>1번 뚜둥이: {oneWorkermentionCounts}회</p>
                  <p>2번 뚜둥이: {twoWorkermentionCounts}회</p>
                  <p>3번 뚜둥이: {threeWorkermentionCounts}회</p>
                </>
              }
            </Accordian>
          </div>
          <p className="text-lg font-semibold mb-2">기본 정보</p>
          <div className="flex flex-col gap-2">
            <Accordian
              title="작업자 명단"
              isAccordianOpen={isAccordianOpen3}
              onClick={handleAccordianClick3}
            >
              <>
                <p className="text-xs mb-1 text-[#626262]">
                  (아래는 뚜둥이 별 지정된 색상을 보여줍니다.)
                </p>
                {personList.map((person) => (
                  <div key={person.id} className="flex items-center gap-1">
                    <p>{person.id + 1}번 뚜둥이</p>
                    <div
                      key={person.id}
                      className="rounded-full w-5 h-5"
                      style={{ backgroundColor: person.color }}
                    ></div>
                  </div>
                ))}
              </>
            </Accordian>
          </div>
        </section>
      </main>
    </div>
  );
}
