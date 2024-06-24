'use client';

import { format } from 'date-fns';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Accordian } from '@/components/Accordian';
import { Dropdown } from '@/components/Dropdown';
import { Modal } from '@/components/Modal';
import { personList } from '@/constants';
import { AssignedWorkers, WeekendArray } from '@/data/type';
import { supabase } from '@/supabase/supabase';
import { assignWorkers } from '@/util/assignedWorkers';
import { getMonthlyWorkScheduleData } from '@/util/getMonthlyWorkScheduleData';
import { isPastDate } from '@/util/isPastDate';
import { isWeekend } from '@/util/isWeekend';
import { generateMonthlyWeekendArray } from '@/util/weekendArrayGenerator';
import workCounter from '@/util/workCounter';

import 'react-calendar/dist/Calendar.css';

const dropdownContents = ['1번 뚜둥이', '2번 뚜둥이', '3번 뚜둥이'];

export default function Home() {
  const [selectedWorker1, setSelectedWorker1] = useState<string>();
  const [selectedWorker2, setSelectedWorker2] = useState<string>();
  const [workScheduleData, setWorkScheduleData] = useState<AssignedWorkers[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 저장하기 버튼 클릭 시 실행되는 함수
  const handleSaveClick = async () => {
    // selectedDate로 선택한 날짜의 데이터를 가져와서 수정
    const selectedData = workScheduleData.find((worker) => worker.date === selectedDate);
    if (selectedData) {
      const newData = {
        ...selectedData,
        workers: [selectedWorker1, selectedWorker2],
      };
      console.log('newData', newData);
      try {
        const { error } = await supabase.from('work_schedule').upsert([newData]);
        if (error) {
          throw error;
        }
        console.log('데이터가 성공적으로 업데이트되었습니다:', newData);
      } catch (error) {
        console.error('데이터를 업데이트하는 도중 오류가 발생했습니다:', error);
      }
    }
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

  // 현재 날짜
  const date = format(new Date(), 'yyyy-MM-dd');
  const [value, onChange] = useState<string>(date);

  // 선택한 날짜
  const selectedDate = moment(value).format('YYYY-MM-DD');

  // 선택한 날짜의 달
  const yearOfSelectedDate = Number(selectedDate.split('-')[0]);
  const monthOfSelectedDate = Number(selectedDate.split('-')[1]);

  // 주말 배열
  const weekendArray = monthOfSelectedDate
    ? generateMonthlyWeekendArray(yearOfSelectedDate, monthOfSelectedDate)
    : null;

  // 주말에 작업자 할당
  const assignedWorkers = assignWorkers(weekendArray as WeekendArray[]);

  // 작업 일정 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('work_schedule').select('*');

        if (error) {
          console.error('Error fetching data:', error);
          return null;
        }
        if (!data) {
          return;
        }
        setWorkScheduleData(data);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    };
    fetchData();
  }, [onChange, isModalOpen]);

  const data = getMonthlyWorkScheduleData(workScheduleData, monthOfSelectedDate);

  // 달력 날짜 변경 & 모달창 열기
  const handleDateChange = (selectedDate) => {
    onChange(selectedDate);
    //주말인지 확인
    if (isWeekend(new Date(selectedDate))) {
      // 과거 날짜인지 확인
      if (!isPastDate(new Date(selectedDate))) {
        // 주말이면서 현재나 과거 날짜가 아니면 상태 변경
        setIsModalOpen(true);
      }
    }
  };

  // 작업자 할당 데이터 추가
  useEffect(() => {
    const addWorkSchedule = async () => {
      // work_schedule 테이블에서 기존 데이터 가져오기
      try {
        const { data: existingData, error } = await supabase.from('work_schedule').select('*');

        if (error) {
          throw error;
        }

        // 중복 데이터 확인 후 추가
        const newData = assignedWorkers.filter((newAssignment) => {
          // work_schedule 테이블에 해당 날짜의 데이터가 없으면 추가
          return !existingData.some(
            (existingAssignment) => existingAssignment.date === newAssignment.date,
          );
        });

        // 중복되지 않는 데이터만 추가
        if (newData.length > 0) {
          const { data: insertedData, error: insertError } = await supabase
            .from('work_schedule')
            .insert(newData);

          if (insertError) {
            throw insertError;
          }

          console.log('새로운 작업 일정을 Supabase에 등록했습니다:', insertedData);
        } else {
          console.log('추가할 작업 일정이 없습니다.');
        }
      } catch (error) {
        console.error('작업 일정을 등록하는 도중 오류가 발생했습니다:', error);
      }
    };

    addWorkSchedule();
  }, [assignedWorkers]);

  // 작업자 목록 출력
  const renderWorkers = () => {
    return data.map((assignment, index) => (
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
  const oneWorkermentionCounts = workCounter('1번 뚜둥이', data as AssignedWorkers[]);
  const twoWorkermentionCounts = workCounter('2번 뚜둥이', data as AssignedWorkers[]);
  const threeWorkermentionCounts = workCounter('3번 뚜둥이', data as AssignedWorkers[]);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen ">
      <main className="flex flex-col gap-10 items-center justify-center flex-1 p-4">
        <Calendar
          locale="ko-KR"
          onChange={handleDateChange}
          value={value}
          showNeighboringMonth={false}
          tileContent={({ date }) => {
            const parsedDate = format(date, 'yyyy-MM-dd');
            for (let i = 0; i < data.length; i++) {
              if (parsedDate === data[i].date) {
                return (
                  <div className="flex gap-1">
                    <div
                      className="rounded-full w-4 h-4"
                      style={{
                        backgroundColor:
                          personList.find((person) => person.name === data[i].workers[0])?.color ||
                          'transparent',
                      }}
                    ></div>
                    <div
                      className="rounded-full w-4 h-4"
                      style={{
                        backgroundColor:
                          personList.find((person) => person.name === data[i].workers[1])?.color ||
                          'transparent',
                      }}
                    ></div>
                  </div>
                );
              }
            }
          }}
        />
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <h3 className="font-bold mb-3">{selectedDate} 작업자 수정 모달</h3>
            <div className="flex items-center gap-5 mb-2">
              <h1>담당자 1</h1>
              <Dropdown
                buttonContent={data.find((worker) => worker.date === selectedDate)?.workers[0]}
                dropdownContent={dropdownContents}
                onSelect={(buttonContent) => setSelectedWorker1(buttonContent)}
              />
            </div>
            <div className="flex items-center gap-5">
              <h1>담당자 2</h1>
              <Dropdown
                buttonContent={data.find((worker) => worker.date === selectedDate)?.workers[1]}
                dropdownContent={dropdownContents}
                onSelect={(selectedOption) => setSelectedWorker2(selectedOption)}
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
