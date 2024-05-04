'use client';

import { Navbar } from '@/components/Navbar';
import { AssignedWorkers, Value, WeekendArray } from '@/data/type';
import { assignWorkers } from '@/util/assignedWorkers';
import { weekendArrayGenerator } from '@/util/weekendArrayGenerator';
import workCounter from '@/util/workCounter';
import { format } from 'date-fns';
import moment from 'moment';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  // 현재 날짜
  const date = format(new Date(), 'yyyy-MM-dd');
  const [value, onChange] = useState(date);

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

  // 작업자 목록 출력
  const renderWorkers = () => {
    return assignedWorkers.map((assignment, index) => (
      <div key={index}>
        <div className="font-semibold">
          {assignment.date}일의 담당자:
          <p>
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
        <Calendar locale="ko-KR" onChange={handleDateChange} value={value} />
        <section className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-md mt-4">
          <p className="text-lg font-semibold mb-2">
            {monthOfSelectedDate}월달 주말은 총 {weekendArray?.length}일입니다.
          </p>
          <br />
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex-1">{renderWorkers()}</div>
            <br />
            <div className="flex-1">
              <p className="font-semibold">작업 횟수</p>
              <p>1번 뚜둥이: {oneWorkermentionCounts}회</p>
              <p>2번 뚜둥이: {twoWorkermentionCounts}회</p>
              <p>3번 뚜둥이: {threeWorkermentionCounts}회</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
