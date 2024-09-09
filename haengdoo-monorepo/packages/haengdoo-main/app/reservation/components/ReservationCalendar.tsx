import moment from "moment";
import React, { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Reservation } from "../../../haengdoo-monorepo/packages/haengdoo-main/types/types";
import ReservationList from "./ReservationList";

moment.locale("ko");
const localizer = momentLocalizer(moment);

interface ReservationCalendarProps {
  reservations: Reservation[];
}

export function ReservationCalendar({
  reservations,
}: ReservationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = reservations.map((reservation) => ({
    title: `${reservation.product}`,
    start: new Date(reservation.reservation_date),
    end: new Date(reservation.reservation_date),
    resource: reservation,
  }));

  const handleSelectSlot = useCallback(({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  }, []);

  const selectedDateReservations = useMemo(() => {
    const dateString = moment(selectedDate).format("YYYY-MM-DD");
    return reservations.filter((r) => r.reservation_date === dateString);
  }, [selectedDate, reservations]);

  return (
    <div className="h-[600px] relative z-10">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        style={{ height: "100%" }}
        views={["month"]}
        selectable
      />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {moment(selectedDate).format("YYYY년 MM월 DD일")} 예약 목록
            </h2>
            <ReservationList
              reservations={selectedDateReservations}
              onUpdate={() => {}}
              onDelete={() => {}}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationCalendar;
