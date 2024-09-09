import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NewReservation } from './ReservationClient';

interface AddReservationModalProps {
  onClose: () => void;
  onAdd: (reservation: NewReservation) => void;
}

export function AddReservationModal({ onClose, onAdd }: AddReservationModalProps) {
  const [reservation, setReservation] = useState<NewReservation>({
    id: uuidv4(),
    payment_status: '미결',
    preparation_status: '준비 예정',
    product: '',
    reservation_date: '',
    customer_name: '',
    customer_phone: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting reservation:', reservation); // 디버깅용 로그
    onAdd(reservation);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">새 예약 추가</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">결제 여부</label>
            <select
              name="payment_status"
              value={reservation.payment_status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="미결">미결</option>
              <option value="완결">완결</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">준비 상태</label>
            <select
              name="preparation_status"
              value={reservation.preparation_status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="준비 예정">준비 예정</option>
              <option value="준비 완료">준비 완료</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">제품</label>
            <input
              type="text"
              name="product"
              value={reservation.product}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">예약일</label>
            <input
              type="date"
              name="reservation_date"
              value={reservation.reservation_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">고객명</label>
            <input
              type="text"
              name="customer_name"
              value={reservation.customer_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">고객 전화번호</label>
            <input
              type="tel"
              name="customer_phone"
              value={reservation.customer_phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">비고</label>
            <textarea
              name="notes"
              value={reservation.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">
              취소
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReservationModal;
