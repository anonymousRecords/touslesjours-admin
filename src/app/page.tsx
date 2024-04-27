'use client';

import { Navbar } from '@/components/Navbar';
import { AssignedWorkers, Value, WeekendArray } from '@/data/type';
import { assignWorkers } from '@/util/assignedWorkers';
import { weekendArrayGenerator } from '@/util/weekendArrayGenerator';
import { weekendCounter } from '@/util/weekendCounter';
import workCounter from '@/util/workCounter';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [value, onChange] = useState<Value>(new Date());
  // 달
  const month = value instanceof Date ? value.getMonth() + 1 : null;
  // 주말 카운트
  const weekendCount = month ? weekendCounter(month) : null;
  // 주말 배열
  const weekendArray = month ? weekendArrayGenerator(month) : null;
  // 주말에 작업자 할당
  const assignedWorkers = assignWorkers(weekendArray as WeekendArray[]);

  // 작업자 목록 출력
  const renderWorkers = () => {
    return assignedWorkers.map((assignment, index) => (
      <div key={index}>
        <p className="font-semibold">{assignment.date}일의 담당자:</p>
        <p>
          {assignment.workers[0]}, {assignment.workers[1]}
        </p>
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
      <main className="flex gap-10 items-center justify-center flex-1">
        <Calendar onChange={onChange} value={value} />
        <section className="w-400 bg-white rounded-lg p-10 shadow-sm">
          <p>
            {month}월달 주말은 총 {weekendCount}일입니다.
          </p>
          <br />
          <div className="flex gap-10">
            <p>{renderWorkers()}</p>
            <div>
              <p>작업 횟수</p>
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
