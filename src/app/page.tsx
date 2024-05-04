'use client';

import { Accordian } from '@/components/Accordian';
import { Navbar } from '@/components/Navbar';
import { AssignedWorkers, personList, WeekendArray } from '@/data/type';
import { assignWorkers } from '@/util/assignedWorkers';
import { weekendArrayGenerator } from '@/util/weekendArrayGenerator';
import workCounter from '@/util/workCounter';
import { format } from 'date-fns';
import moment from 'moment';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
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

  // 현재 날짜
  const date = format(new Date(), 'yyyy-MM-dd');
  const [value, onChange] = useState<string>(date);

  // 선택한 날짜
  const selectedDate = moment(value).format('YYYY-MM-DD');

  // 선택한 날짜의 달
  const monthOfSelectedDate = Number(selectedDate.split('-')[1]);

  // 달력 날짜 변경
  const handleDateChange = (selectedDate) => {
    onChange(selectedDate);
  };

  // 주말 배열
  const weekendArray = monthOfSelectedDate ? weekendArrayGenerator(monthOfSelectedDate) : null;
  // 주말에 작업자 할당
  const assignedWorkers = assignWorkers(weekendArray as WeekendArray[]);
  console.log(assignedWorkers);

  // 작업자 목록 출력
  const renderWorkers = () => {
    return assignedWorkers.map((assignment, index) => (
      <div key={index}>
        <div className="font-semibold">
          {assignment.date}일의 담당자:
          <p className="font-normal">
            {assignment.workers[0]}, {assignment.workers[1]}
          </p>
        </div>
      </div>
    ));
  };

  // 특정 담당자의 작업 횟수 카운트
  const oneWorkermentionCounts = workCounter('1번 뚜둥이', assignedWorkers as AssignedWorkers[]);
  const twoWorkermentionCounts = workCounter('2번 뚜둥이', assignedWorkers as AssignedWorkers[]);
  const threeWorkermentionCounts = workCounter('3번 뚜둥이', assignedWorkers as AssignedWorkers[]);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen ">
      <Navbar />
      <main className="flex flex-col gap-10 items-center justify-center flex-1 p-4">
        <Calendar
          locale="ko-KR"
          onChange={handleDateChange}
          value={value}
          showNeighboringMonth={false}
          tileContent={({ date, view }) => {
            for (let i = 0; i < assignedWorkers.length; i++) {
              if (date.getDate() === assignedWorkers[i].date) {
                return (
                  <div className="flex gap-1">
                    <div
                      className="rounded-full w-4 h-4"
                      style={{
                        backgroundColor:
                          personList.find((person) => person.name === assignedWorkers[i].workers[0])
                            ?.color || 'transparent',
                      }}
                    ></div>
                    <div
                      className="rounded-full w-4 h-4"
                      style={{
                        backgroundColor:
                          personList.find((person) => person.name === assignedWorkers[i].workers[1])
                            ?.color || 'transparent',
                      }}
                    ></div>
                  </div>
                );
              }
            }
          }}
        />
        <section className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-md mt-4 flex flex-col justify-center">
          <p className="text-lg font-semibold mb-2 text-center">
            {monthOfSelectedDate}월 뚜둥이 냉판 작업
          </p>
          <p className="text-xs mb-4 text-center">
            {monthOfSelectedDate}월달 주말은 총 {weekendArray?.length}일입니다.
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
